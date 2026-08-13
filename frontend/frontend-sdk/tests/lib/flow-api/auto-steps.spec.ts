import { autoSteps } from "../../../src/lib/flow-api/auto-steps";

const CALLBACK_TOKEN = "callback-token";
const CALLBACK_URL = `/login?hanko_token=${CALLBACK_TOKEN}`;

describe("thirdparty auto-step", () => {
  it("shares an in-progress token exchange between element instances", async () => {
    let resolveExchange: (state: any) => void;
    const exchangedState = { name: "success" };
    const exchange = new Promise<any>((resolve) => {
      resolveExchange = resolve;
    });
    const exchangeToken = jest.fn().mockReturnValue(exchange);
    const back = jest.fn().mockResolvedValue({ name: "login_init" });
    const firstState = {
      actions: { exchange_token: { run: exchangeToken } },
    } as any;
    const secondState = {
      isCached: true,
      actions: { back: { run: back } },
    } as any;

    history.replaceState(null, "", CALLBACK_URL);

    const firstResult = autoSteps.thirdparty(firstState);
    const secondResult = autoSteps.thirdparty(secondState);
    resolveExchange!(exchangedState);

    await expect(Promise.all([firstResult, secondResult])).resolves.toEqual([
      exchangedState,
      exchangedState,
    ]);
    expect(exchangeToken).toHaveBeenCalledTimes(1);
    expect(back).not.toHaveBeenCalled();
  });
});
