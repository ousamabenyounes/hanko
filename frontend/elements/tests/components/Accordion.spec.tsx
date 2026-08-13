import { h, render } from "preact";
import Accordion from "../../src/components/accordion/Accordion";

const ACCORDION_NAME = "security";
const FIRST_ITEM_ID = `${ACCORDION_NAME}-0`;
const ENTER_KEY = "Enter";

describe("Accordion", () => {
  it("expands the focused item when Enter is pressed", () => {
    const container = document.createElement("div");
    const setCheckedItemID = jest.fn();

    render(
      <Accordion
        name={ACCORDION_NAME}
        columnSelector={(item) => item}
        contentSelector={(item) => item}
        data={["Authenticator app"]}
        setCheckedItemID={setCheckedItemID}
      />,
      container,
    );

    const input = container.querySelector("input");
    expect(input).not.toBeNull();

    input?.dispatchEvent(
      new KeyboardEvent("keydown", { key: ENTER_KEY, bubbles: true }),
    );

    expect(setCheckedItemID).toHaveBeenCalledWith(FIRST_ITEM_ID);
  });
});
