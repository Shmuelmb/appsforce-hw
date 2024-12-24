import styles from "./Form.module.css";
import Field from "./Field";
import { type Field as FieldType } from "@/types";
import { FieldErrors } from "react-hook-form";
import { UseFormRegister } from "react-hook-form";

interface FieldsetProps {
  fields: FieldType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}
export default function Fieldset({ fields, register, errors }: FieldsetProps) {
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
