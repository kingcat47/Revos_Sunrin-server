import styles from "./styles.module.scss";

interface ButtonProps {
  text?: string;
  onClick?: () => void ;
  className?: string;
}

export default function ButtonComponent({
  text,
  onClick,
  className,
}: ButtonProps) {
  return (
    <div className={[styles.container, className].join("")} onClick={onClick}>
      <div className={styles.text}>{text}</div>
    </div>
  );
}
