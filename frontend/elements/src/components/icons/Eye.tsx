import styles from "./styles.sass";

interface Props {
  crossedOut: boolean;
}

const Eye = ({ crossedOut }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={styles.icon}
    aria-hidden="true"
  >
    <path d="M12 5c-5.5 0-9.5 5.1-9.7 5.3a1 1 0 0 0 0 1.3C2.5 11.9 6.5 17 12 17s9.5-5.1 9.7-5.3a1 1 0 0 0 0-1.3C21.5 10.1 17.5 5 12 5Zm0 10c-3.6 0-6.6-2.8-7.6-4 1-1.2 4-4 7.6-4s6.6 2.8 7.6 4c-1 1.2-4 4-7.6 4Zm0-6.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
    {crossedOut ? <path d="m4.7 3.3 16 16-1.4 1.4-16-16 1.4-1.4Z" /> : null}
  </svg>
);

export default Eye;
