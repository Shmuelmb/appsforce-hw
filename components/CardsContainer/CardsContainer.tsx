import { useState } from "react";
import { UserCard } from "@/components/Card/Card";
import { User } from "@/types";
import UseForm from "@/components/Form/Form";
import Modal from "@/components/Modal/Modal";
import { userFormFields } from "@/lib/sources";
import toast from "react-hot-toast";

type CardsContainerProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  onAdd: (user: User) => void;
  searchTerm: string;
};
export function CardsContainer({
  users,
  onEdit,
  onDelete,
  searchTerm,
}: CardsContainerProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.title.toLowerCase().includes(searchLower) ||
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.country.toLowerCase().includes(searchLower) ||
      user.city.toLowerCase().includes(searchLower)
    );
  });
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem" }}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={setSelectedUser}
              onDelete={(id) => onDelete(id)}
            />
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>

      {selectedUser && (
        <Modal
          title="Edit User"
          isOpen={selectedUser !== null}
          onClose={() => setSelectedUser(null)}>
          <UseForm
            fields={userFormFields}
            user={selectedUser}
            existingEmails={users.map((user) => user.email)}
            onSubmit={(data) => {
              onEdit({ ...selectedUser, ...data });
              setSelectedUser(null);
              toast.success("User updated successfully");
            }}
            onCancel={() => setSelectedUser(null)}
          />
        </Modal>
      )}
    </>
  );
}
