// "use client";

// import { ArrowLeft } from "lucide-react";
// import React, { useState } from "react";

// interface Duration {
//   online: number;
//   weekend: number;
//   weekday: number;
// }

// interface CourseFormData {
//   title: string;
//   about: string;
//   duration: Duration;
// }

// const CreateCourseForm = () => {
//   const [formData, setFormData] = useState<CourseFormData>({
//     title: "",
//     about: "",
//     duration: {
//       online: 0,
//       weekend: 0,
//       weekday: 0,
//     },
//   });

//   const handleDurationChange = (type: keyof Duration, value: string) => {
//     setFormData((previous) => ({
//       ...previous,
//       duration: {
//         ...previous.duration,
//         [type]: Number.parseInt(value) || 0,
//       },
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     // Handle form submission
//   };

//   return (
//     <div className="max-w-full">
//       {/* Header with action buttons */}
//       <div className="mb-6 flex items-center justify-between border-b pb-4">
//         <div className="space-y-1">
//           <div className="flex items-center gap-2">
//             <ArrowLeft className="h-5 w-5" />
//             <h1 className="text-xl font-semibold text-blue-950">
//               Create New Course
//             </h1>
//           </div>
//           <p className="text-sm text-gray-500">
//             Fill in the fields below to create a new course.
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             type="button"
//             className="rounded-md border border-red-500 px-4 py-2 text-red-500 hover:bg-red-50"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>

//       {/* Form Content */}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-6 grid grid-cols-2 items-center gap-8">
//           {/* Title Section */}
//           <div>
//             <label className="mb-2 block font-semibold text-blue-950">
//               Title
//             </label>
//             <input
//               type="text"
//               placeholder="Placeholder Text"
//               className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData((previous) => ({
//                   ...previous,
//                   title: e.target.value,
//                 }))
//               }
//             />
//           </div>

//           {/* Duration Section */}
//           <div className="">
//             <label className="mb-2 block font-semibold text-blue-950">
//               Duration
//             </label>
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//               {/* Online Duration */}
//               <div className="flex items-center gap-3">
//                 <label className="mb-1 block text-sm text-gray-500">
//                   Online
//                 </label>
//                 <select
//                   className="w-full rounded-md border border-gray-300 bg-white p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={formData.duration.online}
//                   onChange={(e) =>
//                     handleDurationChange("online", e.target.value)
//                   }
//                 >
//                   {Array.from({ length: 53 }).map((_, index) => (
//                     <option key={index} value={index}>
//                       {index} Weeks
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Weekend Duration */}
//               <div className="flex items-center gap-3">
//                 <label className="mb-1 block text-sm text-gray-500">
//                   Weekend
//                 </label>
//                 <select
//                   className="w-full rounded-md border border-gray-300 bg-white p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={formData.duration.weekend}
//                   onChange={(e) =>
//                     handleDurationChange("weekend", e.target.value)
//                   }
//                 >
//                   {Array.from({ length: 53 }).map((_, index) => (
//                     <option key={index} value={index}>
//                       {index} Weeks
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Weekday Duration */}
//               <div className="flex items-center gap-3">
//                 <label className="mb-1 block text-sm text-gray-500">
//                   Weekday
//                 </label>
//                 <select
//                   className="w-full rounded-md border border-gray-300 bg-white p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={formData.duration.weekday}
//                   onChange={(e) =>
//                     handleDurationChange("weekday", e.target.value)
//                   }
//                 >
//                   {Array.from({ length: 53 }).map((_, index) => (
//                     <option key={index} value={index}>
//                       {index} Weeks
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* About Course Section */}
//         <div className="mb-6">
//           <label className="mb-2 block font-semibold text-blue-950">
//             About Course
//           </label>
//           <textarea
//             placeholder="Placeholder Text"
//             className="h-32 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={formData.about}
//             onChange={(e) =>
//               setFormData((previous) => ({
//                 ...previous,
//                 about: e.target.value,
//               }))
//             }
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateCourseForm;

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
  // useToast,
} from "@strategic-dot/components";
import { ArrowLeft, Loader } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define Zod schema for the Duration type
const durationSchema = z.object({
  online: z.number().min(0).max(52),
  weekend: z.number().min(0).max(52),
  weekday: z.number().min(0).max(52),
});

// Define Zod schema for form validation
const courseFormSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  about: z.string().min(1, "Course description is required"),
  duration: durationSchema,
});

type CourseFormData = z.infer<typeof courseFormSchema>;

interface CreateCourseFormProperties {
  onSubmit?: (data: CourseFormData) => Promise<void>;
  onCancel?: () => void;
}

const CreateCourseForm: FC<CreateCourseFormProperties> = ({
  onSubmit,
  onCancel,
}) => {
  // const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formMethods = useForm<CourseFormData>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      about: "",
      duration: {
        online: 0,
        weekend: 0,
        weekday: 0,
      },
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = formMethods;

  const handleFormSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      // toast({
      //   title: "Success",
      //   description: "Course created successfully",
      // });
      reset();
    } catch {
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: "Failed to create course",
      // });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-full">
      {/* Header with action buttons */}
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
            onClick={handleSubmit(handleFormSubmit)}
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
                  name="duration.online"
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
                      {errors.duration?.online && (
                        <FormMessage>
                          {errors.duration.online?.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                {/* Weekend Duration */}
                <FormField
                  name="duration.weekend"
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
                      {errors.duration?.weekend && (
                        <FormMessage>
                          {errors.duration.weekend?.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                {/* Weekday Duration */}
                <FormField
                  name="duration.weekday"
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
                      {errors.duration?.weekday && (
                        <FormMessage>
                          {errors.duration.weekday?.message}
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
                  <Input
                    placeholder="Course description"
                    {...field}
                    className="h-32 w-full rounded-md border px-4 py-2"
                  />
                </FormControl>
                {errors.about && (
                  <FormMessage>{errors.about?.message}</FormMessage>
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
