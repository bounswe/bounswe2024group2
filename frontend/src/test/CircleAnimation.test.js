import CircleAnimation from "../components/CircleAnimation";
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'


describe("CircleAnimation", () => {

    it("renders without crashing", () => {
        render(<CircleAnimation />);
        expect(screen.getByTestId("spinner-container")).toBeTruthy();
    });
    
    it("renders with relative class", () => {
        // Get spinner id element and expect it classname to be spinner-relative
        render(<CircleAnimation relative={true} />);
        const spinner = screen.getByTestId("spinner");
        expect(spinner).toHaveClass("spinner-relative");
    });
    }
);