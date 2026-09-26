import { useState, type FormEvent } from "react";
import outsideIcon from "../../assets/icons/outside.png";
import radioIcon from "../../assets/icons/radio.png";
import downArrow from "../../assets/icons/down-arrow.png";
import type { Currency, Discount, PriceType } from "../../types";

interface Props {
  discount: Discount | null;
  onClose: () => void;
  onSave: (discount: Discount) => void;
}

const MAX_PERCENTAGE = 25;

const labelClass = "mt-2 mb-1.5 block text-sm text-ink";
const inputClass = "mb-3 w-full border border-line p-2 text-sm outline-none";

const priceTypes: { value: PriceType; label: string }[] = [
  { value: "one-time", label: "One time price" },
  { value: "monthly", label: "Monthly price" },
];

const currencies: { value: Currency; label: string }[] = [
  { value: "%", label: "% Percentage" },
  { value: "€", label: "€ Euro" },
];

export default function AddDiscountModal({ discount, onClose, onSave }: Props) {
  const [priceType, setPriceType] = useState<PriceType>(discount?.type ?? "monthly");
  const [currency, setCurrency] = useState<Currency>(discount?.currency ?? "%");
  const [amount, setAmount] = useState(discount ? String(discount.amount) : "");
  const [duration, setDuration] = useState(discount?.duration ?? "");
  const [newPrice, setNewPrice] = useState(discount?.newPrice ?? "");
  const [name, setName] = useState(discount?.name ?? "Manual");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isTooHigh = currency === "%" && Number(amount) > MAX_PERCENTAGE;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSave({
      id: discount?.id ?? Date.now(),
      enabled: discount?.enabled ?? true,
      isManual: true,
      name,
      amount: Number(amount),
      currency,
      type: priceType,
      duration,
      newPrice,
    });
  }

  function selectCurrency(value: Currency) {
    setCurrency(value);
    setDropdownOpen(false);
  }

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/40 p-[25px]">
      <div className="w-[764px] bg-white px-5 pt-2.5 pb-[30px] text-ink shadow-modal">
        <h3 className="mt-5 mb-[30px] text-xl font-bold">{discount ? "Edit discount" : "Add discount"}</h3>
        <p className="text-sm">For which price do you calculate the discount?</p>

        <form onSubmit={handleSubmit}>
          <div className="mt-[7px] mb-4 flex gap-2.5">
            {priceTypes?.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPriceType(option.value)}
                className={`flex h-[66px] w-[187px] items-center justify-center gap-4 rounded-[10px] ${
                  priceType === option.value ? "bg-brand text-white" : "bg-toggle text-muted"
                }`}
              >
                {option.label}
                <img src={priceType === option.value ? radioIcon : outsideIcon} alt="" className="size-[23px]" />
              </button>
            ))}
          </div>

          <label className={labelClass}>Discount</label>
          <div className="relative flex">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`relative mb-3 h-10 w-[67px] border bg-surface pl-4 text-left text-sm ${
                isTooHigh ? "border-danger" : "border-line"
              }`}
            >
              {currency}
              <img src={downArrow} alt="" className="absolute top-[17px] right-1.5" />
            </button>

            {dropdownOpen && (
              <ul className="absolute top-[42px] left-0 z-10 bg-white text-sm whitespace-nowrap text-black shadow-modal">
                {currencies.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => selectCurrency(option.value)}
                    className="cursor-pointer px-3 py-2.5 hover:bg-surface"
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Discount amount"
              className={`mb-3 h-10 flex-1 border border-l-0 p-2 text-sm outline-none ${
                isTooHigh ? "border-danger bg-danger/10" : "border-line"
              }`}
            />
          </div>
          {isTooHigh && <p className="mt-1 mb-3.5 text-sm text-danger">Exceeds the max. of {MAX_PERCENTAGE}%</p>}

          <label className={labelClass}>Duration</label>
          <div className="relative mb-3">
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Number of months"
              className="w-full border border-line p-2 pr-16 text-sm outline-none"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted">
              months
            </span>
          </div>

          <label className={labelClass}>New price</label>
          <input
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="e.g. € 950.00"
            className={inputClass}
          />

          <label className={labelClass}>Description</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Discount description"
            className={inputClass}
          />

          <div className="mt-4 flex justify-between text-sm">
            <button type="button" className="text-brand" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="h-10 w-[57px] bg-brand text-base text-white hover:bg-brand-dark">
              {discount ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
