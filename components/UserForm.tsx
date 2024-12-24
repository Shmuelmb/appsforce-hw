import { User } from "@/types";
import Modal from "./Modal/Modal";
import UserForm from "./UseForm/UseForm";
import { userFormFields } from "@/lib/sources";
type Props = {
  user?: User;
  users: User[];
  existingEmails: string[];
  action: (data: User) => void;
  setAction: () => void;
  onCancel: () => void;
  isOpen: boolean;
  title: string;
};

export default function AddUserForm({
  onCancel,
  action,
  users,
  user,
  setAction,
  isOpen,
  title,
}: Props) {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onCancel}>
      <UserForm
        user={user}
        fields={userFormFields}
        existingEmails={users.map((user) => user.email)}
        onSubmit={(data) => {
          action(data);
          setAction();
        }}
        onCancel={onCancel}
      />
    </Modal>
  );
}
