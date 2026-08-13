import { h } from "preact";
import { Dispatch, SetStateAction, useCallback } from "preact/compat";
type Selector<T> = (item: T, itemIndex?: number) => string | h.JSX.Element;

import cx from "classnames";
import styles from "./styles.sass";

const ENTER_KEY = "Enter";

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

  const toggleItem = (input: HTMLInputElement) => {
    const itemIndex = parseInt(input.value, 10);
    const id = toID(itemIndex);
    setCheckedItemID(id === checkedItemID ? null : id);
  };

  const clickHandler = (event: Event) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    toggleItem(event.target);
  };

  const keyDownHandler = (event: KeyboardEvent) => {
    if (
      event.key !== ENTER_KEY ||
      !(event.target instanceof HTMLInputElement)
    ) {
      return;
    }
    event.preventDefault();
    toggleItem(event.target);
  };

  return (
    <div className={styles.accordion}>
      {data.map((item, itemIndex) => (
        <div className={styles.accordionItem} key={itemIndex}>
          <input
            type={"radio"}
            className={styles.accordionInput}
            id={`${name}-${itemIndex}`}
            name={name}
            onClick={clickHandler}
            onKeyDown={keyDownHandler}
            value={itemIndex}
            checked={checked(itemIndex)}
          />
          <label
            className={cx(styles.label, dropdown && styles.dropdown)}
            for={`${name}-${itemIndex}`}
          >
            <span className={styles.labelText}>
              {columnSelector(item, itemIndex)}
            </span>
          </label>
          <div
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
