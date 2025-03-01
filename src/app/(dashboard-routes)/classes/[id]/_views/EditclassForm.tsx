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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { updateClassAction } from "~/action/class.action";
import ConfirmationModal from "~/components/modals/ConfirmationModal";
import SuccessModal from "~/components/modals/response-modal";
import { useFetchData } from "~/hooks/useFetchData";
import { classFormData, classFormSchema } from "~/schemas";
import { useAuthStore } from "~/stores/authStore";
import { useClassStore } from "~/stores/classStore";
import { useCourseStore } from "~/stores/courseStore";

interface ApiError {
  status: number;
  message: string;
  details?: {
    message: string;
    success: boolean;
  };
}

const EditClassForm = () => {
  const { token } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const router = useRouter();
  const parameters = useParams();
  const id = parameters.id; // Extract class ID from the route
  const fetchSingleClass = useClassStore((state) => state.fetchSingleClass);
  const selectedClass = useClassStore((state) => state.selectedClass);

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    router.back(); // Use router to navigate back
    formMethods.reset();
  };

  const formMethods = useForm<classFormData>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      title: "",
      fee: "",
      startDate: "",
      // endDate: "",
      courseId: "",
      type: "weekday",
      description: "",
    },
  });

  // console.log(selectedClass);

  const { handleSubmit, formState, control, reset } = formMethods;
  const { errors } = formState;
  const courses = useCourseStore((state) => state.courses);
  const { loading, error } = useFetchData(token);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (parameters.id && token && courses) {
      fetchSingleClass(parameters.id as string, token);
    }
  }, [parameters.id, token, fetchSingleClass, courses]);

  useEffect(() => {
    if (selectedClass) {
      reset({
        title: selectedClass.title,
        description: selectedClass.description,
        fee: selectedClass.fee.toString(),
        startDate: selectedClass.startDate,
        // endDate: selectedClass.endDate,
        type: selectedClass.type,
        courseId: selectedClass.courseId,
      });
    }
  }, [selectedClass, reset]);

  const onSubmit = async (data: classFormData) => {
    if (!token || !id) {
      console.error("User is not authenticated or course ID is missing.");
      return;
    }
    setIsSubmitting(true);
    setFormError(null); // Clear previous errors
    try {
      await updateClassAction(id as string, data, token);
      // router.push("/classes");
      setShowSuccessModal(true);
    } catch (error: unknown) {
      const error_ = error as ApiError;
      // console.log(error);
      if (error_?.details?.message) {
        setFormError(error_.details.message);
      } else {
        setFormError("An unknown error occurred while updating the class.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewClass = () => {
    // Navigate to the newly created class
    if (showSuccessModal) {
      router.push(`/classes`);
    }
    setShowSuccessModal(false);
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (loading) {
    return <p className="animate-zoom-in">Fetching course.....</p>;
  }

  return (
    <>
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Class Edit?"
        description="You have unsaved changes. Are you sure you want to cancel editing this class?"
      />
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
              onClick={handleCancelClick}
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

              {/* courses */}
              <FormField
                name="courseId"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={selectedClass?.courseId}
                      >
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
                    {errors.courseId && (
                      <FormMessage>{errors.courseId?.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-6">
              {/* Preference */}
              <FormField
                name="type"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preference</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-4">
                        {["online", "weekday", "weekend"].map((type) => (
                          <label key={type}>
                            <input
                              type="radio"
                              {...field}
                              value={type}
                              checked={field.value === type}
                              className="mr-2 h-4 w-4"
                            />
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </label>
                        ))}
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
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Class Updated Successfully"
        description="Class has been updated and saved successfully."
        actionLabel="Continue"
        onAction={handleViewClass}
      />
    </>
  );
};

export default EditClassForm;
