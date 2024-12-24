import styles from "./Form.module.css";
import { Path, UseFormRegister } from "react-hook-form";
import { type FieldValues } from "react-hook-form";
type FieldProps<T extends FieldValues> = {
  label: string;
  onRegister: UseFormRegister<T>;
  error?: string;
  id: string;
  placeholder: string;
};
export default function Field<T extends FieldValues>({
  label,
  error,
  id,
  onRegister,
  placeholder,
}: FieldProps<T>) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        className={styles.input}
        {...onRegister(id as Path<T>)}
        placeholder={placeholder}
        style={error ? { border: "1px solid red" } : {}}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
