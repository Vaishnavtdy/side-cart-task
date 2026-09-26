import closeIcon from "../../assets/icons/close.png";

interface Props {
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({ onClose, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/30">
      <div className="flex min-h-40 w-[500px] flex-col gap-9 bg-white p-6 text-subtle">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Delete discount</h3>
          <button onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <p className="-mt-3 text-sm">Are you sure you want to delete this discount?</p>
        <button
          className="h-12 py-2 w-[165px] self-end bg-danger text-sm text-white hover:bg-danger-dark"
          onClick={onConfirm}
        >
          Delete discount
        </button>
      </div>
    </div>
  );
}
