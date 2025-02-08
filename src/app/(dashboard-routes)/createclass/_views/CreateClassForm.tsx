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
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { createClassAction } from "~/action/class.action";
import { useFetchData } from "~/hooks/useFetchData";
import { classFormData, classFormSchema } from "~/schemas";
import { useAuthStore } from "~/stores/authStore";
import { useCourseStore } from "~/stores/courseStore";

interface CreateClassFormProperties {
  onCancel: () => void;
}

const CreateClassForm: FC<CreateClassFormProperties> = ({ onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const formMethods = useForm<classFormData>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      title: "",
      fee: "",
      startDate: "",
      endDate: "",
      course: "",
      type: "weekday",
      description: "",
    },
  });

  // const { courses, fetchCourses } = useCourseStore();
  const { token } = useAuthStore();
  const { handleSubmit, formState, control, reset } = formMethods;
  const { errors } = formState;
  const courses = useCourseStore((state) => state.courses);
  const { loading, error } = useFetchData(token);
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (data: classFormData) => {
    console.log(data);
    setIsSubmitting(true);

    if (!token) {
      // console.error("Token is undefined. Please log in.");
      router.push("/login");
      return;
    }
    try {
      await createClassAction(
        {
          title: data.title,
          description: data.description,
          fee: data.fee,
          startDate: data.startDate,
          endDate: data.endDate,
          type: data.type,
        },
        data.course,
        token,
      );
      reset();
      router.push(`/classes`);
    } catch (error: unknown) {
      console.log(error);
      setFormError(`Failed to create class: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (loading) {
    return <p className="animate-zoom-in">Fetching course.....</p>;
  }

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
            onClick={handleSubmit(onSubmit)}
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
          {formError && <p className="font-bold text-red-500">{formError}</p>}
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
                    <div className="relative w-full">
                      <Input
                        type="date"
                        {...field}
                        className="w-full rounded-md border px-4 py-2 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3"
                      />
                    </div>
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
                    <div className="relative w-full">
                      <Input
                        type="date"
                        {...field}
                        className="w-full rounded-md border px-4 py-2 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3"
                      />
                    </div>
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
                        {courses?.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.title}
                          </SelectItem>
                        ))}
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
              name="type"
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
                  {errors.type && (
                    <FormMessage>{errors.type?.message}</FormMessage>
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
