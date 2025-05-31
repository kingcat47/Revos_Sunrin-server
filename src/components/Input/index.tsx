import styles from "./styles.module.scss";

interface InputProps {
  className?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: () => {};
}

export default function InputComponent({
  className,
  placeholder,
  type,
  value,
}: InputProps) {
  return (
    <>
      <div className={[styles.container, className].join("")}>
        <input
          className={[styles.InputItem, className].join("")}
          placeholder={placeholder}
          type={type}
          value={value}
        ></input>
      </div>
    </>
  );
}
