import { createContext, h, render } from "preact";
import { act } from "preact/test-utils";
import { describe, expect, it, jest } from "@jest/globals";

const translate = (key: string) => key;
const translateContext = createContext({ t: translate });
const appContext = createContext({ uiState: { isDisabled: false } });

jest.mock("@denysvuika/preact-translate", () => ({
  TranslateContext: translateContext,
}));
jest.mock("../../contexts/AppProvider", () => ({ AppContext: appContext }));

import Input from "./Input";

describe("Input", () => {
  it("toggles password visibility with an accessible button", () => {
    const container = document.createElement("div");

    act(() =>
      render(<Input type="password" placeholder="Password" />, container),
    );

    const input = container.querySelector("input");
    const toggle = container.querySelector("button");

    expect(input?.type).toBe("password");
    expect(toggle?.getAttribute("aria-label")).toBe("labels.showPassword");
    expect(toggle?.getAttribute("aria-pressed")).toBe("false");

    act(() => toggle?.click());

    expect(input?.type).toBe("text");
    expect(toggle?.getAttribute("aria-label")).toBe("labels.hidePassword");
    expect(toggle?.getAttribute("aria-pressed")).toBe("true");
  });
});
