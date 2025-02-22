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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import ConfirmationModal from "~/components/modals/ConfirmationModal";
import { courseFormData, CourseFormSchema } from "~/schemas";
import { useAuthStore } from "~/stores/authStore";
import { useCourseStore } from "~/stores/courseStore";

interface ApiError {
  status: number;
  message: string;
  details?: {
    message: string;
    success: boolean;
  };
}

const EditCourseForm = () => {
  const { getCourseById, updateCourse } = useCourseStore();
  const { token } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();
  const parameters = useParams();
  const id = parameters.id; // Extract course ID from the route

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    router.back(); // Use router to navigate back
    formMethods.reset();
  };

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
    reset,
    formState: { errors },
  } = formMethods;

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!token || !id) {
        setError("Authentication token or course ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const course = await getCourseById(id as string, token);
        if (course) {
          reset({
            title: course.title,
            description: course.description,
            onlineDuration: course.duration?.online || 0,
            weekdayDuration: course.duration?.weekday || 0,
            weekendDuration: course.duration?.weekend || 0,
          });
        }
      } catch {
        setError("Failed to load course details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, token, getCourseById, reset]);

  const onSubmit = async (data: courseFormData) => {
    if (!token || !id) {
      console.error("User is not authenticated or course ID is missing.");
      return;
    }
    setIsSubmitting(true);
    setError(null); // Clear previous errors
    try {
      await updateCourse(id as string, data, token);
      router.push("/courses");
    } catch (error: unknown) {
      const error_ = error as ApiError;
      console.log(error);
      if (error_?.details?.message) {
        setFormError(error_.details.message);
      } else {
        setFormError("An unknown error occurred while updating the course.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading course details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Course Edit?"
        description="You have unsaved changes. Are you sure you want to cancel creating this course?"
      />
      <div className="max-w-full">
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <h1 className="text-xl font-semibold text-blue-950">
                Edit Course
              </h1>
            </div>
            <p className="text-sm text-gray-500">
              Modify the fields below to update the course details.
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

        {/* Form */}
        <Form {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="mb-6 grid grid-cols-2 items-start gap-8">
              {/* Title Field */}
              <FormField
                name="title"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <label className="block font-semibold text-blue-950">
                      Title
                    </label>
                    <FormControl>
                      <Input placeholder="Course Title" {...field} />
                    </FormControl>
                    {errors.title && (
                      <FormMessage>{errors.title.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Duration Fields */}
              <div>
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
                        {errors.weekendDuration && (
                          <FormMessage>
                            {errors.weekendDuration?.message}
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
                        {errors.weekdayDuration && (
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

            {/* Description Field */}
            <FormField
              name="description"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <label className="block font-semibold text-blue-950">
                    About Course
                  </label>
                  <FormControl>
                    <textarea
                      placeholder="Course description"
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
    </>
  );
};

export default EditCourseForm;
