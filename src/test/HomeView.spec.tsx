import { render, screen } from "@testing-library/react";
import { HomeView } from "../views/HomeView";
//en caso de que este mockeado ...
jest.mock("./constants", () => ({ ApiKey: "mocked-token" }));

describe("Examples", () => {
  it("should render Home", () => {
    render(<HomeView />);
    screen.debug();
  });
});
