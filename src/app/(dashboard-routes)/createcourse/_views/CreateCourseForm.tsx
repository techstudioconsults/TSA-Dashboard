"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TsaButton,
} from "@strategic-dot/components";
import { ArrowLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { courseFormData, CourseFormSchema } from "~/schemas";
import { useAuthStore } from "~/stores/authStore";
import { useCourseStore } from "~/stores/courseStore";

interface CreateCourseFormProperties {
  onCancel?: () => void;
}

const CreateCourseForm: FC<CreateCourseFormProperties> = ({ onCancel }) => {
  const { createCourse } = useCourseStore();
  const { token } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const formMethods = useForm<courseFormData>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      onlineDuration: 0,
      weekdayDuration: 0,
      weekendDuration: 0,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = formMethods;

  const onSubmit = async (data: courseFormData) => {
    // console.log(token);
    if (!token) {
      // console.error("User is not authenticated");
      router.push("/login");
      return;
    }
    setIsSubmitting(true);
    try {
      await createCourse(data, token);
      reset();
      router.push("/courses"); // Adjust the route as needed
    } catch (error) {
      console.error("Failed to create course:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-full">
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />

            <h1 className="text-xl font-semibold text-blue-950">
              Create New Course
            </h1>
          </div>

          <p className="text-sm text-gray-500">
            Fill in the fields below to create a new course.
          </p>
        </div>

        <div className="flex gap-3">
          <TsaButton
            variant="outline"
            onClick={onCancel}
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            Cancel
          </TsaButton>
          <TsaButton
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            isDisabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <Loader className="animate-spin text-white" />
            ) : (
              "Save Changes"
            )}
          </TsaButton>
        </div>
      </div>
      {/* Form Content */}
      <Form {...formMethods}>
        <form className="space-y-6">
          <div className="mb-6 grid grid-cols-2 items-start gap-8">
            {/* Title Section */}
            <FormField
              name="title"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <label className="mb-2 block font-semibold text-blue-950">
                    Title
                  </label>
                  <FormControl>
                    <Input
                      placeholder="Course Title"
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

            {/* Duration Section */}
            <div className="">
              <label className="mb-2 block font-semibold text-blue-950">
                Duration
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Online Duration */}
                <FormField
                  name="onlineDuration"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-3">
                        <label className="mb-1 block text-sm text-gray-500">
                          Online
                        </label>
                        <FormControl>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            value={field.value.toString()}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select weeks" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 53 }).map((_, index) => (
                                <SelectItem
                                  key={index}
                                  value={index.toString()}
                                >
                                  {index} Weeks
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      {errors.onlineDuration && (
                        <FormMessage>
                          {errors.onlineDuration?.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                {/* Weekend Duration */}
                <FormField
                  name="weekendDuration"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-3">
                        <label className="mb-1 block text-sm text-gray-500">
                          Weekend
                        </label>
                        <FormControl>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            value={field.value.toString()}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select weeks" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 53 }).map((_, index) => (
                                <SelectItem
                                  key={index}
                                  value={index.toString()}
                                >
                                  {index} Weeks
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      {errors?.weekdayDuration && (
                        <FormMessage>
                          {errors.weekdayDuration?.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                {/* Weekday Duration */}
                <FormField
                  name="weekdayDuration"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-3">
                        <label className="mb-1 block text-sm text-gray-500">
                          Weekday
                        </label>
                        <FormControl>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            value={field.value.toString()}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select weeks" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 53 }).map((_, index) => (
                                <SelectItem
                                  key={index}
                                  value={index.toString()}
                                >
                                  {index} Weeks
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      {errors?.weekdayDuration && (
                        <FormMessage>
                          {errors.weekdayDuration?.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* About Course Section */}
          <FormField
            name="description"
            control={control}
            render={({ field }) => (
              <FormItem>
                <label className="mb-2 block font-semibold text-blue-950">
                  About Course
                </label>
                <FormControl>
                  <textarea
                    placeholder="Course description"
                    {...field}
                    className="h-32 w-full rounded-md border px-4 py-2"
                  />
                </FormControl>
                {errors?.description && (
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

export default CreateCourseForm;
