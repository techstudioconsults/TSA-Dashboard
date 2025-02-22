import { Dialog } from "@headlessui/react";
import { TsaButton } from "@strategic-dot/components";

interface ConfirmationModalProperties {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProperties> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "Any unsaved changes will be lost. Do you want to continue?",
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      {/* Dialog Backdrop */}
      <div className="fixed inset-0 bg-gray-400 opacity-40 shadow-xl" />

      {/* Modal Content */}
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
            <div className="p-14">
              <div className="space-y-4">
                <Dialog.Title className="text-center text-2xl font-semibold text-gray-800">
                  {title}
                </Dialog.Title>

                {description && (
                  <p className="text-center text-gray-600">{description}</p>
                )}
              </div>

              <div className="mx-auto mt-10 flex w-52 flex-col justify-center gap-4">
                <TsaButton
                  className="bg-mid-blue py-3"
                  onClick={onConfirm}
                  variant="primary"
                >
                  Confirm
                </TsaButton>
                <TsaButton
                  className="border-red-500 text-red-500"
                  onClick={onClose}
                  variant="outline"
                >
                  Go Back
                </TsaButton>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationModal;
