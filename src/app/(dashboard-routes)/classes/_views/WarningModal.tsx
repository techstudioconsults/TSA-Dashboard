import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  TsaButton,
} from "@strategic-dot/components";

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="px-10 py-16">
        <DialogHeader>
          <DialogTitle className="mx-auto w-4/5">
            <h5 className="text-center text-2xl font-semibold text-gray-800">
              Are you sure you want to delete this class?
            </h5>
          </DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <div className="mx-auto flex w-52 flex-col justify-center gap-4">
            <TsaButton
              onClick={onConfirm}
              className="bg-mid-blue py-3"
              variant="primary"
            >
              Yes
            </TsaButton>
            <TsaButton
              onClick={onClose}
              className="border-red-500 text-red-500"
              variant="outline"
            >
              No
            </TsaButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarningModal;
