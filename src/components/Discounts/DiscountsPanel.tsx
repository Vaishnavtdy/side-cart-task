import editIcon from "../../assets/icons/edit.png";
import deleteIcon from "../../assets/icons/delete.png";
import type { Discount } from "../../types";

interface Props {
  discounts: Discount[];
  onAdd: () => void;
  onEdit: (discount: Discount) => void;
  onToggle: (id: number) => void;
  onDelete: (discount: Discount) => void;
}

const steps = ["Klantgegevens", "Productgegevens", "Checkout"];

export default function DiscountsPanel({ discounts, onAdd, onEdit, onToggle, onDelete }: Props) {
  return (
    <div className="flex w-[771px] max-w-full flex-col rounded border border-[#e0e0e0] bg-white max-tablet:w-full">
      <h2 className="flex h-[47px] items-center bg-brand pl-4 text-sm/[1.6] text-white">Discounts</h2>

      <div className="flex justify-end border-b border-[#eee] pt-3.5 pr-6 pb-3">
        <button className="text-sm/[1.6] text-brand hover:opacity-80" onClick={onAdd}>
          + Add manual discount
        </button>
      </div>

      <ul className="px-6 pb-6">
        {discounts.map((discount) => (
          <li key={discount.id} className="flex items-center justify-between py-5">
            <div className="flex w-4/5 items-center justify-between py-3.5 text-sm/[1.6] text-ink">
              <span>{discount.name}</span>
              <span>
                {discount.currency} {discount.amount} {discount.type}
              </span>
            </div>

            {discount.isManual ? (
              <div className="flex">
                <button className="-mr-[13px]" onClick={() => onEdit(discount)}>
                  <img src={editIcon} alt="Edit" />
                </button>
                <button className="-mr-2" onClick={() => onDelete(discount)}>
                  <img src={deleteIcon} alt="Delete" />
                </button>
              </div>
            ) : (
              <label className="relative mt-2 mb-1.5 inline-block h-[35px] w-[70px]">
                <input
                  type="checkbox"
                  className="peer"
                  checked={discount.enabled}
                  onChange={() => onToggle(discount.id)}
                />
                <span className="absolute inset-0 cursor-pointer bg-switch-off transition duration-300 peer-checked:bg-brand before:absolute before:bottom-1 before:left-1 before:size-[27px] before:bg-white before:transition before:duration-300 before:content-[''] peer-checked:before:translate-x-[34px]" />
              </label>
            )}
          </li>
        ))}
      </ul>

      <div className="flex justify-between border-t border-[#eee] px-6 py-4 text-sm max-mobile:flex-col max-mobile:gap-2">
        <button className="text-brand hover:text-brand-dark">Previous</button>
        <button className="h-10 w-[62px] bg-brand hover:bg-white hover:text-brand text-white max-mobile:w-full">Next</button>
      </div>

      {steps.map((step) => (
        <div key={step} className="flex h-[47px] items-center bg-line pl-4 text-sm text-muted">
          {step}
        </div>
      ))}
    </div>
  );
}
