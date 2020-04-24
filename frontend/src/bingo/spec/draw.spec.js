import { initLeftOver, draw, reset, leftOver, drawn } from "../draw";

describe("draw", () => {
  it("should draw a number", () => {
    draw();
    expect(drawn.length).toBe(1);
    expect(leftOver.length).toBe(74);
    reset();
    expect(drawn.length).toBe(0);
  });
});
describe("initLeftOver", () => {
  it("should initialize fields", () => {
    const result = initLeftOver();
    expect(result.length).toBe(75);
    expect(result).toMatchSnapshot();
  });
});
