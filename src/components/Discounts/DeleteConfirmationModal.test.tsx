import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

describe("DeleteConfirmationModal", () => {
  it("calls onConfirm when delete is clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<DeleteConfirmationModal onClose={vi.fn()} onConfirm={onConfirm} />);

    await user.click(screen.getByRole("button", { name: "Delete discount" }));

    expect(onConfirm).toHaveBeenCalled();
  });

  it("calls onClose when close is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<DeleteConfirmationModal onClose={onClose} onConfirm={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onClose).toHaveBeenCalled();
  });
});
