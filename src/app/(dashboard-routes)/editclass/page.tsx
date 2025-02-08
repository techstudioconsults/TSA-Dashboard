"use client";

import { useRouter } from "next/navigation";

import EditClassForm from "./_views/Editclass";

const EditClass = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/courses");
  };
  return (
    <>
      <EditClassForm onCancel={handleCancel} />
    </>
  );
};

export default EditClass;
