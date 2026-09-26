import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Discount } from "../../types";
import Overview from "./Overview";

const discounts: Discount[] = [
  { id: 1, name: "Percent off", amount: 5, currency: "%", type: "one-time", enabled: true },
  { id: 2, name: "Euro off", amount: 250, currency: "€", type: "one-time", enabled: true },
];

describe("Overview", () => {
  it("shows the totals", () => {
    render(<Overview discounts={[]} oneTimePrice={1000} oneTimeTotal={750} monthlyTotal={8} />);

    expect(screen.getByText("€ 750")).toBeInTheDocument();
    expect(screen.getAllByText("€ 8")).toHaveLength(2);
  });

  it("shows each discount", () => {
    render(<Overview discounts={discounts} oneTimePrice={1000} oneTimeTotal={700} monthlyTotal={10} />);

    expect(screen.getByText("- 5%")).toBeInTheDocument();
    expect(screen.getByText("- € 250")).toBeInTheDocument();
  });
});
