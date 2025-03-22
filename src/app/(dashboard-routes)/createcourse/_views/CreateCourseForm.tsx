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
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createCourseAction } from "~/action/course.actions";
import ConfirmationModal from "~/components/modals/ConfirmationModal";
import SuccessModal from "~/components/modals/response-modal";
import { courseFormData, CourseFormSchema } from "~/schemas";
import { useAuthStore } from "~/stores/authStore";

interface ApiError {
  message: string;
  path: string;
}

const CreateCourseForm = () => {
  const { token } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const formMethods = useForm<courseFormData>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: {
      title: "",
      about: "",
      onlineDuration: 0,
      weekdayDuration: 0,
      weekendDuration: 0,
      curriculum: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = formMethods;

  const onSubmit = async (data: courseFormData) => {
    if (!token) {
      router.push("/login");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        if (typeof value === "number") {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value);
        }
      }

      await createCourseAction(formData, token);
      reset();
      setShowSuccessModal(true);
    } catch (error: unknown) {
      const error_ = error as ApiError;
      console.error("Failed to create course:", error);
      console.log(error_.message);
      setFormError(`An error occurred: ${error_.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    reset();
    router.back();
  };

  const handleViewCourses = () => {
    // Navigate to the newly created class
    if (showSuccessModal) {
      router.push(`/courses`);
    }
    setShowSuccessModal(false);
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Course Creation?"
        description="You have unsaved changes. Are you sure you want to cancel creating this course?"
      />
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
            {formError && <p className="text-red-500">{`${formError}`}</p>}
          </div>

          <div className="flex gap-3">
            <TsaButton
              variant="outline"
              onClick={handleCancelClick}
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
              name="about"
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
                  {errors?.about && (
                    <FormMessage>{errors.about?.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Curriculum Section */}
            <FormField
              name="curriculum"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <label className="mb-2 block font-semibold text-blue-950">
                    Curriculum
                  </label>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(event_) => {
                        const file = event_.target.files?.[0];
                        field.onChange(file);
                      }}
                      className="w-full rounded-md border px-4 py-2"
                    />
                  </FormControl>
                  {field.value && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {field.value.name}
                    </p>
                  )}
                  {errors.curriculum && (
                    <FormMessage>{errors.curriculum?.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Created Successfully"
        description="Course has been created and saved successfully."
        actionLabel="Continue"
        onAction={handleViewCourses}
      />
    </>
  );
};

export default CreateCourseForm;
