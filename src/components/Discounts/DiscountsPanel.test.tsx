import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Discount } from "../../types";
import DiscountsPanel from "./DiscountsPanel";

const discount: Discount = { id: 1, name: "Summer", amount: 10, currency: "%", type: "monthly", enabled: true };

function renderPanel(discounts: Discount[]) {
  const props = { onAdd: vi.fn(), onEdit: vi.fn(), onToggle: vi.fn(), onDelete: vi.fn() };
  render(<DiscountsPanel discounts={discounts} {...props} />);
  return props;
}

describe("DiscountsPanel", () => {
  it("shows the discount details", () => {
    renderPanel([discount]);

    expect(screen.getByText("Summer")).toBeInTheDocument();
    expect(screen.getByText("% 10 monthly")).toBeInTheDocument();
  });

  it("calls onAdd", async () => {
    const { onAdd } = renderPanel([]);

    await userEvent.click(screen.getByRole("button", { name: "+ Add manual discount" }));

    expect(onAdd).toHaveBeenCalled();
  });

  it("toggles a normal discount", async () => {
    const { onToggle } = renderPanel([discount]);

    await userEvent.click(screen.getByRole("checkbox"));

    expect(onToggle).toHaveBeenCalledWith(1);
  });

  it("edits and deletes a manual discount", async () => {
    const manual = { ...discount, isManual: true };
    const { onEdit, onDelete } = renderPanel([manual]);

    await userEvent.click(screen.getByRole("button", { name: "Edit" }));
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(onEdit).toHaveBeenCalledWith(manual);
    expect(onDelete).toHaveBeenCalledWith(manual);
  });
});
