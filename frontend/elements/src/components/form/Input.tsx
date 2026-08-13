import { h, InputHTMLAttributes } from "preact";
import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/compat";
import { TranslateContext } from "@denysvuika/preact-translate";
import { Input as FlowInput } from "@teamhanko/hanko-frontend-sdk";
import { AppContext } from "../../contexts/AppProvider";
import cx from "classnames";
import Eye from "../icons/Eye";

import styles from "./styles.sass";

interface Props extends InputHTMLAttributes {
  label?: string;
  markOptional?: boolean;
  markError?: boolean;
  flowInput?: FlowInput<any>;
}

const Input = ({ label, ...props }: Props) => {
  const ref = useRef(null);
  const { uiState } = useContext(AppContext);
  const { t } = useContext(TranslateContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = props.type === "password";

  const disabled = useMemo(
    () => uiState.isDisabled || props.disabled,
    [props, uiState],
  );

  useEffect(() => {
    const { current: element } = ref;
    if (element && props.autofocus) {
      element.focus();
      element.select();
    }
  }, [props.autofocus]);

  const placeholder = useMemo(() => {
    if (props.markOptional && !props.flowInput?.required) {
      return `${props.placeholder} (${t("labels.optional")})`;
    }
    return props.placeholder;
  }, [props.markOptional, props.placeholder, props.flowInput, t]);

  return (
    <div className={styles.inputWrapper}>
      <input
        spellcheck={false}
        part={"input text-input"}
        required={props.flowInput?.required}
        maxLength={props.flowInput?.max_length}
        minLength={props.flowInput?.min_length}
        hidden={props.flowInput?.hidden}
        {...props}
        type={isPassword && passwordVisible ? "text" : props.type}
        ref={ref}
        aria-label={placeholder}
        placeholder={placeholder}
        className={cx(
          styles.input,
          isPassword && styles.passwordInput,
          !!props.flowInput?.error && props.markError && styles.error,
        )}
        disabled={disabled}
      />
      {isPassword ? (
        <button
          type="button"
          part="password-toggle"
          className={styles.passwordToggle}
          aria-label={t(
            passwordVisible ? "labels.hidePassword" : "labels.showPassword",
          )}
          aria-pressed={passwordVisible}
          disabled={disabled}
          onClick={() => setPasswordVisible((visible) => !visible)}
        >
          <Eye crossedOut={passwordVisible} />
        </button>
      ) : null}
    </div>
  );
};

export default Input;
