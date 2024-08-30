import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("HomePage", () => {
  it("renders a default page nextjs", () => {
    render(<Home />);

    const nextjsLogo = screen.getByAltText("Next.js Logo");

    expect(nextjsLogo).toBeInTheDocument();
  });
});
