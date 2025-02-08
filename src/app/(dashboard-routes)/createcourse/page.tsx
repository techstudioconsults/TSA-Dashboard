"use client";

import { useRouter } from "next/navigation";

import CreateCourseForm from "./_views/CreateCourseForm";

const CreateCourse = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/courses");
  };
  return (
    <>
      <CreateCourseForm onCancel={handleCancel} />
    </>
  );
};

export default CreateCourse;
