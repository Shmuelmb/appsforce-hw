import styles from "./Form.module.css";
import Field from "./Field";
import { FieldErrors } from "react-hook-form";
import { UseFormRegister } from "react-hook-form";
type Field = {
  label: string;
  id: string;
  placeholder: string;
};

interface Props {
  fields: Field[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}
export default function Fieldset({ fields, register, errors }: Props) {
  return (
    <fieldset className={styles.fieldSet}>
      {fields.map((field) => (
        <Field
          key={field.id}
          onRegister={register}
          error={errors[field.id]?.message as string}
          {...field}
        />
      ))}
    </fieldset>
  );
}
