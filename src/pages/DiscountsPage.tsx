import { useEffect, useState } from "react";
import type { Discount, PriceType } from "../types";
import DiscountsPanel from "../components/Discounts/DiscountsPanel";
import Overview from "../components/Discounts/Overview";
import AddDiscountModal from "../components/Discounts/AddDiscountModal";
import DeleteConfirmationModal from "../components/Discounts/DeleteConfirmationModal";

const ONE_TIME_PRICE = 1000;
const MONTHLY_PRICE = 10;

const defaultDiscounts: Discount[] = [
  {
    id: 1,
    name: "Discount name",
    amount: 250,
    currency: "€",
    type: "one-time",
    enabled: true,
  },
  {
    id: 2,
    name: "Discount name",
    amount: 5,
    currency: "%",
    type: "one-time",
    enabled: false,
  },
  {
    id: 3,
    name: "Discount name",
    amount: 250,
    currency: "€",
    type: "monthly",
    enabled: false,
  },
];

// Default discounts + the manual ones saved in the browser
function getInitialDiscounts(): Discount[] {
  const saved = localStorage.getItem("manualDiscounts");
  return saved ? [...defaultDiscounts, ...JSON.parse(saved)] : defaultDiscounts;
}

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>(getInitialDiscounts);
  const [showModal, setShowModal] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [deletingDiscount, setDeletingDiscount] = useState<Discount | null>(
    null,
  );

  // Save manual discounts whenever the list changes
  useEffect(() => {
    const manual = discounts.filter((d) => d.isManual);
    localStorage.setItem("manualDiscounts", JSON.stringify(manual));
  }, [discounts]);

  function openAddModal() {
    setEditingDiscount(null);
    setShowModal(true);
  }

  function openEditModal(discount: Discount) {
    setEditingDiscount(discount);
    setShowModal(true);
  }

  function toggleDiscount(id: number) {
    setDiscounts(
      discounts.map((d) => (d.id === id ? { ...d, enabled: !d.enabled } : d)),
    );
  }

  function saveDiscount(discount: Discount) {
    const exists = discounts.some((d) => d.id === discount.id);
    if (exists) {
      setDiscounts(discounts.map((d) => (d.id === discount.id ? discount : d)));
    } else {
      setDiscounts([...discounts, discount]);
    }
    setShowModal(false);
  }

  function deleteDiscount() {
    setDiscounts(discounts.filter((d) => d.id !== deletingDiscount?.id));
    setDeletingDiscount(null);
  }

  function getDiscountTotal(type: PriceType, basePrice: number) {
    let total = 0;
    for (const d of discounts) {
      if (!d.enabled || d.type !== type) continue;
      total += d.currency === "%" ? (basePrice * d.amount) / 100 : d.amount;
    }
    return total;
  }

  return (
    <main className="mx-auto w-full max-w-[1154px] bg-page px-6 pt-5 pb-10 max-tablet:max-w-[750px] max-tablet:px-4 max-mobile:p-3">
      <button className="mt-20 mb-3 block h-10 w-[85px] bg-muted hover:bg-white hover:text-brand text-sm text-white">
        Previous
      </button>

      <div className="flex items-start justify-center gap-8 max-tablet:flex-col max-tablet:items-center max-tablet:gap-5">
        <DiscountsPanel
          discounts={discounts}
          onAdd={openAddModal}
          onEdit={openEditModal}
          onToggle={toggleDiscount}
          onDelete={setDeletingDiscount}
        />
        <Overview
          discounts={discounts.filter((d) => d.enabled)}
          oneTimePrice={ONE_TIME_PRICE}
          oneTimeTotal={
            ONE_TIME_PRICE - getDiscountTotal("one-time", ONE_TIME_PRICE)
          }
          monthlyTotal={
            MONTHLY_PRICE - getDiscountTotal("monthly", MONTHLY_PRICE)
          }
        />
      </div>

      {showModal && (
        <AddDiscountModal
          discount={editingDiscount}
          onClose={() => setShowModal(false)}
          onSave={saveDiscount}
        />
      )}

      {deletingDiscount && (
        <DeleteConfirmationModal
          onClose={() => setDeletingDiscount(null)}
          onConfirm={deleteDiscount}
        />
      )}
    </main>
  );
}
