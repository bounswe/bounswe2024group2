import AlertModal from '../components/alert/AlertModal';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe("AlertModal", () => {

    it("renders without crashing", () => {
        render(<AlertModal />);
        expect(screen.getByText("Cancel")).toBeTruthy();
    });

    it("renders with danger button", () => {
        const onConfirm = jest.fn();
        render(<AlertModal isDanger={true} onConfirm={onConfirm} />);
        const dangerButton = screen.getByText("Confirm");
        expect(dangerButton).toHaveClass("danger-btn");
    });

    it("renders with custom message", () => {
        const message = "Are you sure?";
        render(<AlertModal message={message} />);
        expect(screen.getByText(message)).toBeTruthy();
    });

    it("renders with custom cancel text", () => {
        const textCancel = "No, thanks";
        render(<AlertModal textCancel={textCancel} />);
        expect(screen.getByText(textCancel)).toBeTruthy();
    });

    it("renders with custom confirm text", () => {
        const textConfirm = "Yes, do it";
        const onConfirm = jest.fn();
        render(<AlertModal textConfirm={textConfirm} onConfirm={onConfirm} />);
        expect(screen.getByText(textConfirm)).toBeTruthy();
    });

    it("calls onCancel callback when cancel button is clicked", () => {
        const onCancel = jest.fn();
        render(<AlertModal onCancel={onCancel} />);
        fireEvent.click(screen.getByText("Cancel"));
        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it("calls onConfirm callback when confirm button is clicked", () => {
        const onConfirm = jest.fn();
        render(<AlertModal onConfirm={onConfirm} />);
        fireEvent.click(screen.getByText("Confirm"));
        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it("increments value when confirm button is clicked", () => {
        let value = 0;
        const onConfirm = () => value++;
        render(<AlertModal onConfirm={onConfirm} />);
        fireEvent.click(screen.getByText("Confirm"));
        expect(value).toBe(1);
    });

    it("increments value when cancel button is clicked", () => {
        let value = 0;
        const onCancel = () => value++;
        render(<AlertModal onCancel={onCancel} />);
        fireEvent.click(screen.getByText("Cancel"));
        expect(value).toBe(1);
    });

});