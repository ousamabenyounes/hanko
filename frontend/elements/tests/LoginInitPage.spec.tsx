import { render } from "preact";
import { act } from "preact/test-utils";
import { TranslateContext } from "@denysvuika/preact-translate";

import { AppContext } from "../src/contexts/AppProvider";
import LoginInitPage from "../src/pages/LoginInitPage";

const RESTART_LABEL = "labels.restart";

describe("LoginInitPage", () => {
  it("restarts a failed flow that has no available actions", () => {
    const init = jest.fn();
    const container = document.createElement("div");
    const state = {
      actions: {
        continue_with_login_identifier: { enabled: false, inputs: {} },
        thirdparty_oauth: { enabled: false, inputs: {} },
        webauthn_generate_request_options: { enabled: false, inputs: {} },
        remember_me: { enabled: false, inputs: {} },
      },
      error: { code: "flow_expired_error" },
    };
    const appContext = {
      hanko: {
        onBeforeStateChange: jest.fn(() => jest.fn()),
        onAfterStateChange: jest.fn(() => jest.fn()),
      },
      init,
      initialComponentName: "auth",
      uiState: {},
      setUIState: jest.fn(),
      hidePasskeyButtonOnLogin: false,
      isOwnFlow: jest.fn(() => true),
    };

    act(() => {
      render(
        <TranslateContext.Provider value={{ t: (key: string) => key }}>
          <AppContext.Provider value={appContext as any}>
            <LoginInitPage state={state as any} />
          </AppContext.Provider>
        </TranslateContext.Provider>,
        container,
      );
    });

    const restartButton = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent === RESTART_LABEL,
    );
    expect(restartButton).toBeDefined();

    act(() => restartButton.click());

    expect(init).toHaveBeenCalledWith("login");
  });
});
