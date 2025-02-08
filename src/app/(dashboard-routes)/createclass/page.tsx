"use client";

import { useRouter } from "next/navigation";

import CreateClassForm from "./_views/CreateClassForm";

const CreateClass = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/classes");
  };
  return (
    <div>
      <CreateClassForm onCancel={handleCancel} />
    </div>
  );
};

export default CreateClass;
