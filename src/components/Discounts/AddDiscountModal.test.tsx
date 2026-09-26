import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AddDiscountModal from "./AddDiscountModal";

describe("AddDiscountModal", () => {
  it("saves a new discount", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<AddDiscountModal discount={null} onClose={vi.fn()} onSave={onSave} />);

    await user.type(screen.getByPlaceholderText("Discount amount"), "10");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Manual", amount: 10, currency: "%", type: "monthly", isManual: true }),
    );
  });

  it("fills in the form when editing", () => {
    const discount = { id: 5, name: "Loyalty", amount: 15, currency: "€" as const, type: "one-time" as const, enabled: true };
    render(<AddDiscountModal discount={discount} onClose={vi.fn()} onSave={vi.fn()} />);

    expect(screen.getByText("Edit discount")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Discount amount")).toHaveValue(15);
    expect(screen.getByPlaceholderText("Discount description")).toHaveValue("Loyalty");
  });

  it("shows an error above 25%", async () => {
    const user = userEvent.setup();
    render(<AddDiscountModal discount={null} onClose={vi.fn()} onSave={vi.fn()} />);

    await user.type(screen.getByPlaceholderText("Discount amount"), "30");

    expect(screen.getByText("Exceeds the max. of 25%")).toBeInTheDocument();
  });

  it("changes the currency to euro", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<AddDiscountModal discount={null} onClose={vi.fn()} onSave={onSave} />);

    await user.click(screen.getByRole("button", { name: "%" }));
    await user.click(screen.getByText("€ Euro"));
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ currency: "€" }));
  });

  it("calls onClose on cancel", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<AddDiscountModal discount={null} onClose={onClose} onSave={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onClose).toHaveBeenCalled();
  });
});
