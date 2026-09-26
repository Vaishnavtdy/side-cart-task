import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import DiscountsPage from "./DiscountsPage";

describe("DiscountsPage", () => {
  it("shows the default discounts and totals", () => {
    render(<DiscountsPage />);

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("€ 750")).toBeInTheDocument();
  });

  it("updates the total when a discount is toggled", async () => {
    const user = userEvent.setup();
    render(<DiscountsPage />);

    await user.click(screen.getAllByRole("checkbox")[1]);

    expect(screen.getByText("€ 700")).toBeInTheDocument();
  });

  it("adds a manual discount", async () => {
    const user = userEvent.setup();
    render(<DiscountsPage />);

    await user.click(screen.getByRole("button", { name: "+ Add manual discount" }));
    await user.type(screen.getByPlaceholderText("Discount amount"), "10");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(localStorage.getItem("manualDiscounts")).toContain("Manual");
  });

  it("deletes a manual discount", async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      "manualDiscounts",
      JSON.stringify([{ id: 100, name: "Saved", amount: 20, currency: "€", type: "one-time", enabled: true, isManual: true }]),
    );
    render(<DiscountsPage />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);

    await user.click(screen.getByRole("button", { name: "Delete" }));
    await user.click(screen.getByRole("button", { name: "Delete discount" }));

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});
