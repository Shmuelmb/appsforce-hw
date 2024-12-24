import styles from "./Form.module.css";
import Field from "./Field";
import { type Field as FieldType } from "@/types";
import { FieldErrors } from "react-hook-form";
import { UseFormRegister } from "react-hook-form";
import { type FieldValues } from "react-hook-form";

interface FieldsetProps<T extends FieldValues, U extends FieldValues> {
  fields: FieldType[];
  errors: FieldErrors<T>;
  register: UseFormRegister<U>;
}
export default function Fieldset<T extends FieldValues, U extends FieldValues>({
  fields,
  register,
  errors,
}: FieldsetProps<T, U>) {
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
