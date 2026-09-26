import type { ReactNode } from "react";
import overviewImage from "../../assets/icons/overview.png";
import type { Discount } from "../../types";

function Row({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <div className="flex justify-between px-[22px] py-2.5">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

interface Props {
  discounts: Discount[];
  oneTimePrice: number;
  oneTimeTotal: number;
  monthlyTotal: number;
}

export default function Overview({ discounts, oneTimePrice, oneTimeTotal, monthlyTotal }: Props) {
  return (
    <aside className="w-[351px] max-w-full shrink-0 bg-white pt-6 text-sm text-ink shadow-card max-tablet:w-full">
      <img src={overviewImage} alt="" className="mx-auto -my-1.25 h-[74px] w-[60px]" />
      <h3 className="mt-5 px-6 text-xl/7 font-bold text-heading">Overview</h3>

      <div className="px-6 pb-3">
        <p className="flex h-[41px] items-center justify-between">
          Webasto Pure II laadpaal type 2 <span>€ {oneTimePrice}</span>
        </p>
        <p className="flex h-[41px] items-center justify-between">
          <i>Maandelijkse prijs</i> <span>€ {monthlyTotal}</span>
        </p>
        <button className="-ml-[5px] text-brand">Edit</button>
      </div>

      <p className="mb-[30px] flex h-[70px] justify-between bg-highlight p-6 font-bold">
        Eventually per month excl. btw <span>€ {monthlyTotal}</span>
      </p>

      <div className="bg-highlight">
        <Row label="Subtotal onetime costs excl. btw" value={`€ ${oneTimePrice}`} />
        {discounts.map((d) => (
          <Row key={d.id} label={d.name} value={d.currency === "%" ? `- ${d.amount}%` : `- € ${d.amount}`} />
        ))}
        <Row label={<strong>Onetime costs excl. btw</strong>} value={<strong>€ {oneTimeTotal}</strong>} />
      </div>
    </aside>
  );
}
