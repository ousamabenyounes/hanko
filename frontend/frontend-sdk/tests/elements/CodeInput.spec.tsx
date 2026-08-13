import { createContext, h, render } from "preact";
import { act } from "preact/test-utils";

const PASSCODE_INPUT_SELECTOR = 'input[name="passcode0"]';
const ONE_TIME_CODE_AUTOCOMPLETE = "one-time-code";

jest.mock("../../../elements/src/contexts/AppProvider", () => ({
  AppContext: createContext({ uiState: { isDisabled: false } }),
}));

import CodeInput from "../../../elements/src/components/form/CodeInput";

describe("CodeInput", () => {
  it("identifies passcode fields for one-time-code autofill", () => {
    const container = document.createElement("div");

    act(() => {
      render(h(CodeInput, { passcodeDigits: [] }), container);
    });

    const input = container.querySelector(PASSCODE_INPUT_SELECTOR);
    expect(input?.getAttribute("autocomplete")).toBe(
      ONE_TIME_CODE_AUTOCOMPLETE,
    );
  });
});
