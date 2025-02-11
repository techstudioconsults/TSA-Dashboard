"use client";

import { useRouter } from "next/navigation";

import EditClassForm from "./_views/EditclassForm";

const EditClass = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/classes");
  };
  return (
    <>
      <EditClassForm onCancel={handleCancel} />
    </>
  );
};

export default EditClass;
