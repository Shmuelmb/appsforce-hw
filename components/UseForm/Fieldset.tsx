import styles from "./UseForm.module.css";
import Field from "./Field";
import { FieldErrors } from "react-hook-form";
import { UseFormRegister } from "react-hook-form";
type Field = {
  label: string;
  id: string;
};

interface Props {
  fields: Field[];
  errors: FieldErrors<any>;
  register: UseFormRegister<any>;
}
export default function Fieldset({ fields, register, errors }: Props) {
  return (
    <fieldset className={styles.fieldSet}>
      {fields.map((field) => (
        <Field
          key={field.id}
          {...field}
          onRegister={register}
          error={errors[field.id]?.message}
        />
      ))}
    </fieldset>
  );
}
