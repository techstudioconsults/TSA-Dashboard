import * as z from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email("Must be a valid email address")
    .min(1, "Email Address is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .min(1, "password is required"),
});

export const classFormSchema = z.object({
  title: z.string().min(1, "Class title is required"),
  fee: z.string().min(1, "Fee is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  course: z.string().min(1, "Course selection is required"),
  preference: z.enum(["online", "weekday", "weekend"], {
    required_error: "Please select a preference",
  }),
  description: z.string().min(1, "Description is required"),
});

export type signInFormData = z.infer<typeof signInSchema>;
export type classFormData = z.infer<typeof classFormSchema>;

// const formSchema = z.object({
//   firstName: z
//   .string()
//     .min(2, "First Name must be at least 2 characters long")
//     .min(1, "First Name is required"),
//   lastName: z
//   .string()
//   .min(2, "Last Name must be at least 2 characters long")
//   .min(1, "Last Name is required"),
//   email: z
//     .string()
//     .email("Must be a valid email address")
//     .min(1, "Email Address is required"),
//   phoneNumber: z
//     .string()
//     .min(11, "Phone Number must be at least 10 characters long")
//     .min(1, "Phone Number is required"),
// });

// export const contactFormSchema = z.object({
//   fullName: z
//     .string()
//     .min(2, "Full Name must be at least 2 characters long")
//     .min(1, "Full Name is required"),
//   email: z
//     .string()
//     .email("Must be a valid email address")
//     .min(1, "Email Address is required"),
//   message: z
//     .string()
//     .min(10, "Message must be at least 10 characters long")
//     .min(1, "Message is required"),
// });

// export const registerFormSchema = formSchema.merge(
//   z.object({
//     course: z
//       .string()
//       .min(1, "Course is required")
//       .refine((value) => value !== "", {
//         message: "Please select a course",
//       }),
//     schedule: z
//       .string()
//       .min(1, "Schedule is required")
//       .refine((value) => value !== "", {
//         message: "Please select a schedule",
//       }),
//   }),
// );

// export const signUpFormSchema = formSchema.merge(
//   z.object({
//     course: z
//       .string()
//       .min(1, "Course is required")
//       .refine((value) => value !== "", {
//         message: "Please select a course",
//       }),
//     schedule: z
//       .string()
//       .min(1, "Schedule is required")
//       .refine((value) => value !== "", {
//         message: "Please select a schedule",
//       }),
//     newsletter: z.boolean(),
//   }),
// );

// export const newsletterFormSchema = z.object({
//   email: z
//     .string()
//     .email("Must be a valid email address")
//     .min(1, "Email Address is required"),
// });

// // type declaration
// export type ContactFormData = z.infer<typeof contactFormSchema>;
// export type RegisterFormData = z.infer<typeof registerFormSchema>;
// export type SignUpFormData = z.infer<typeof signUpFormSchema>;
// export type newsletterFormData = z.infer<typeof newsletterFormSchema>;
