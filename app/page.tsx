"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "./page.module.css";
import { UserCard } from "@/components/UserCard/UserCard";
import { User } from "@/types";
import Loader from "@/components/Loader/Loader";
import { useUsers } from "@/hooks/use-users";
import UseForm from "@/components/UseForm/UseForm";
import Modal from "@/components/Modal/Modal";
import { userFormFields } from "@/lib/sources";
import UserForm from "@/components/UseForm/UseForm";
const queryClient = new QueryClient();
function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);

  const {
    users,
    isLoading,
    deleteUserMutation,
    updateUserMutation,
    addUserMutation,
  } = useUsers(queryClient);
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

  if (isLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Loader />
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Users manger</h1>
        <button
          className={styles.addButton}
          onClick={() => setIsAddingUser(true)}>
          Add User
        </button>
      </div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by name, email, location, or ID..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.grid}>
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={setSelectedUser}
            onDelete={(id) => deleteUserMutation.mutate(id)}
          />
        ))}
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
              updateUserMutation.mutate({ ...selectedUser, ...data });

              setSelectedUser(null);
            }}
            onCancel={() => setSelectedUser(null)}
          />
        </Modal>
      )}

      {isAddingUser && (
        <Modal
          title="Add User"
          isOpen={isAddingUser}
          onClose={() => setIsAddingUser(false)}>
          <UseForm
            fields={userFormFields}
            existingEmails={users.map((user) => user.email)}
            onSubmit={(data) => {
              addUserMutation.mutate(data);
              setIsAddingUser(false);
            }}
            onCancel={() => setIsAddingUser(false)}
          />
        </Modal>
      )}
    </main>
  );
}
export default function Page() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
