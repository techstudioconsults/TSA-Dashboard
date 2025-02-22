import { Dialog } from "@headlessui/react";
import { TsaButton } from "@strategic-dot/components";

interface WarningModalProperties {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const WarningModal: React.FC<WarningModalProperties> = ({
  isOpen,
  onClose,
  onConfirm,
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
              <Dialog.Title className="text-center text-lg font-semibold text-gray-800">
                Are you sure you want to delete this class? This action cannot
                be undone.
              </Dialog.Title>

              <div className="mx-auto mt-10 flex w-52 flex-col justify-center gap-4">
                <TsaButton onClick={onConfirm} variant="primary">
                  Yes
                </TsaButton>
                <TsaButton onClick={onClose} variant="outline">
                  No
                </TsaButton>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default WarningModal;
