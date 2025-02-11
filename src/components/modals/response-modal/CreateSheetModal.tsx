import { Dialog } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TsaButton } from "@strategic-dot/components";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SheetFormData, SheetsFormSchema } from "~/schemas";
import { useAuthStore } from "~/stores/authStore";
import { useSheetStore } from "~/stores/sheetStore";

interface CreateSheetModalProperties {
  isOpen: boolean;
  onClose: () => void;
}

const CreateSheetModal: React.FC<CreateSheetModalProperties> = ({
  isOpen,
  onClose,
}) => {
  const { createSheet } = useSheetStore();
  const { token } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SheetFormData>({
    resolver: zodResolver(SheetsFormSchema),
  });

  const onSubmitHandler = async (data: SheetFormData) => {
    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    try {
      await createSheet(data, token);
      reset();
      onClose();
      router.push("/sheets");
    } catch (error) {
      console.error("Error creating sheet:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-400 opacity-40" />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-6">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="mb-4 text-xl font-semibold text-gray-800">
              Create Sheet
            </Dialog.Title>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">
                  Sheet Title
                </label>
                <input
                  {...register("title")}
                  className="w-full rounded-md border border-gray-300 p-2 outline-none"
                  placeholder="Enter Sheet Name"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <TsaButton
                  type="submit"
                  variant="primary"
                  className="bg-mid-blue py-3"
                  isDisabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </TsaButton>
                <TsaButton
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="border-red-400 font-semibold text-red-500 outline-red-500"
                >
                  Cancel
                </TsaButton>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateSheetModal;
