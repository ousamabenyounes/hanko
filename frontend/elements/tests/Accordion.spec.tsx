import { h } from "preact";
import { render } from "preact/compat";

import Accordion from "../src/components/accordion/Accordion";

const ACCORDION_NAME = "settings";
const ITEM = "Security key";
const CONTENT = "Manage security key";
const EXPECTED_PARTS = [
  "accordion",
  "accordion-item",
  "accordion-input",
  "accordion-label",
  "accordion-label-text",
  "accordion-content",
];

describe("Accordion", () => {
  it("exposes its elements as CSS shadow parts", () => {
    const container = document.createElement("div");

    render(
      <Accordion
        name={ACCORDION_NAME}
        columnSelector={(item) => item}
        contentSelector={() => CONTENT}
        setCheckedItemID={() => undefined}
        data={[ITEM]}
      />,
      container,
    );

    expect(
      Array.from(container.querySelectorAll("[part]"), (element) =>
        element.getAttribute("part"),
      ),
    ).toEqual(EXPECTED_PARTS);
  });
});
