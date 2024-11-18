"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TsaButton,
} from "@strategic-dot/components";
import { Loader } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { classFormSchema } from "~/schemas";

type ClassFormData = z.infer<typeof classFormSchema>;

interface CreateClassFormProperties {
  onSubmit: (formData: ClassFormData) => void;
  onCancel: () => void;
}

const CreateClassForm: FC<CreateClassFormProperties> = ({
  onSubmit,
  onCancel,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formMethods = useForm<ClassFormData>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      title: "",
      fee: "",
      startDate: "",
      endDate: "",
      course: "",
      preference: "weekend",
      description: "",
    },
  });

  const { handleSubmit, formState, control, reset } = formMethods;
  const { errors } = formState;

  const handleFormSubmit = async (data: ClassFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
    } catch {
      // handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-indigo-900">
            Create New Class
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Fill in the fields below to create a new class under a course.
          </p>
        </div>
        <div className="flex space-x-4">
          <TsaButton
            variant="primary"
            onClick={handleSubmit(handleFormSubmit)}
            isDisabled={isSubmitting}
            className="bg-blue-500"
          >
            {isSubmitting ? (
              <Loader className="animate-spin text-white" />
            ) : (
              "Save Changes"
            )}
          </TsaButton>
          <TsaButton
            variant="outline"
            onClick={onCancel}
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            Cancel
          </TsaButton>
        </div>
      </div>

      <Form {...formMethods}>
        <form className="space-y-6">
          <div className="grid grid-cols-2 items-center gap-6">
            {/* Class Title */}
            <FormField
              name="title"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Class Title"
                      {...field}
                      className="w-full rounded-md border px-4 py-2"
                    />
                  </FormControl>
                  {errors.title && (
                    <FormMessage>{errors.title?.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Fee */}
            <FormField
              name="fee"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Fee"
                      {...field}
                      className="w-full rounded-md border px-4 py-2"
                    />
                  </FormControl>
                  {errors.fee && (
                    <FormMessage>{errors.fee?.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 items-center gap-6">
            {/* Start Date */}
            <FormField
              name="startDate"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="w-full rounded-md border px-4 py-2"
                    />
                  </FormControl>
                  {errors.startDate && (
                    <FormMessage>{errors.startDate?.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* End Date */}
            <FormField
              name="endDate"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="w-full rounded-md border px-4 py-2"
                    />
                  </FormControl>
                  {errors.endDate && (
                    <FormMessage>{errors.endDate?.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 items-center gap-6">
            {/* Course */}
            <FormField
              name="course"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="course1">Course 1</SelectItem>
                        <SelectItem value="course2">Course 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.course && (
                    <FormMessage>{errors.course?.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Preference */}
            <FormField
              name="preference"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preference</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <label>
                        <input
                          type="radio"
                          {...field}
                          value="online"
                          className="mr-2 h-4 w-4"
                        />
                        Online
                      </label>
                      <label>
                        <input
                          type="radio"
                          {...field}
                          value="weekday"
                          className="mr-2 h-4 w-4"
                        />
                        Weekday
                      </label>
                      <label>
                        <input
                          type="radio"
                          {...field}
                          value="weekend"
                          className="mr-2 h-4 w-4"
                        />
                        Weekend
                      </label>
                    </div>
                  </FormControl>
                  {errors.preference && (
                    <FormMessage>{errors.preference?.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>

          {/* Description */}
          <FormField
            name="description"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Description"
                    {...field}
                    className="h-32 w-full rounded-md border px-4 py-2"
                  />
                </FormControl>
                {errors.description && (
                  <FormMessage>{errors.description?.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default CreateClassForm;
