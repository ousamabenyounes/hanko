import { h } from "preact";
import { Dispatch, SetStateAction, useCallback } from "preact/compat";
type Selector<T> = (item: T, itemIndex?: number) => string | h.JSX.Element;

import cx from "classnames";
import styles from "./styles.sass";

const ACCORDION_PARTS = {
  accordion: "accordion",
  item: "accordion-item",
  input: "accordion-input",
  label: "accordion-label",
  labelText: "accordion-label-text",
  content: "accordion-content",
} as const;

interface Props<T> {
  name: string;
  columnSelector: Selector<T>;
  contentSelector: Selector<T>;
  checkedItemID?: string;
  setCheckedItemID: Dispatch<SetStateAction<string | null>>;
  data: Array<T>;
  dropdown?: boolean;
}

const Accordion = function <T>({
  name,
  columnSelector,
  contentSelector,
  data = [],
  checkedItemID,
  setCheckedItemID,
  dropdown = false,
}: Props<T>) {
  const toID = useCallback(
    (itemIndex: number) => `${name}-${itemIndex}`,
    [name],
  );

  const checked = useCallback(
    (itemIndex: number) => toID(itemIndex) === checkedItemID,
    [checkedItemID, toID],
  );

  const clickHandler = (event: Event) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    const itemIndex = parseInt(event.target.value, 10);
    const id = toID(itemIndex);
    setCheckedItemID(id === checkedItemID ? null : id);
  };

  return (
    <div part={ACCORDION_PARTS.accordion} className={styles.accordion}>
      {data.map((item, itemIndex) => (
        <div
          part={ACCORDION_PARTS.item}
          className={styles.accordionItem}
          key={itemIndex}
        >
          <input
            part={ACCORDION_PARTS.input}
            type={"radio"}
            className={styles.accordionInput}
            id={`${name}-${itemIndex}`}
            name={name}
            onClick={clickHandler}
            value={itemIndex}
            checked={checked(itemIndex)}
          />
          <label
            part={ACCORDION_PARTS.label}
            className={cx(styles.label, dropdown && styles.dropdown)}
            for={`${name}-${itemIndex}`}
          >
            <span part={ACCORDION_PARTS.labelText} className={styles.labelText}>
              {columnSelector(item, itemIndex)}
            </span>
          </label>
          <div
            part={ACCORDION_PARTS.content}
            className={cx(
              styles.accordionContent,
              dropdown && styles.dropdownContent,
            )}
          >
            {contentSelector(item, itemIndex)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
