import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, type UserFormData } from "@/lib/validations/user";
import { User } from "@/types";
import styles from "./UseForm.module.css";
import Fieldset from "./Fieldset";

interface UserFormProps {
  user?: User;
  existingEmails: string[];
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  fields: { label: string; id: string; placeholder: string }[];
}

export default function UserForm({
  user,
  existingEmails,
  onSubmit,
  onCancel,
  fields,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      title: user?.title || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      country: user?.country || "",
      city: user?.city || "",
      streetName: user?.streetName || "",
      streetNumber: user?.streetNumber?.toString() || "",
    },
  });

  const onSubmitForm = async (data: UserFormData) => {
    if (existingEmails.includes(data.email) && data.email !== user?.email) {
      setError("email", {
        type: "manual",
        message: "This email is already in use",
      });
      return;
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
      <Fieldset fields={fields} register={register} errors={errors} />

      <div className={styles.buttons}>
        <button
          type="button"
          onClick={onCancel}
          className={`${styles.button} ${styles.cancelButton}`}>
          Cancel
        </button>
        <button
          type="submit"
          className={`${styles.button} ${styles.submitButton}`}>
          {user ? "Update User" : "Add User"}
        </button>
      </div>
    </form>
  );
}
