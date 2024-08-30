import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("HomePage", () => {
  it("renders a default page nextjs", () => {
    render(<Home />);

    const nextjsLogo = screen.getByAltText("Next.js Logo");

    expect(nextjsLogo).toBeInTheDocument();
  });

  it("renders correctly & match with the snapshot", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
