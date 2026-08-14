import { autoSteps } from "../../../src/lib/flow-api/auto-steps";

const CALLBACK_PATH = "/login";

describe("thirdparty auto-step", () => {
  it("returns to the previous state when no redirect URL is available", async () => {
    window.history.replaceState(null, "", CALLBACK_PATH);

    const previousState = { name: "login_init" };
    const back = jest.fn().mockResolvedValue(previousState);
    const state = {
      actions: { back: { run: back } },
      isCached: false,
      payload: {},
      saveToLocalStorage: jest.fn(),
    };

    await expect(autoSteps.thirdparty(state as never)).resolves.toBe(
      previousState,
    );
    expect(back).toHaveBeenCalledTimes(1);
    expect(state.saveToLocalStorage).not.toHaveBeenCalled();
  });
});
