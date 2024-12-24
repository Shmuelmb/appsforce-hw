import styles from "./UseForm.module.css";
import { UseFormRegister } from "react-hook-form";

type Props = {
  label: string;
  onRegister: UseFormRegister<any>;
  error?: string;
  id: string;
  placeholder: string;
};
export default function Field({
  label,
  error,
  id,
  onRegister,
  placeholder,
}: Props) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        className={styles.input}
        {...onRegister(id)}
        placeholder={placeholder}
        style={error ? { border: "1px solid red" } : {}}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
