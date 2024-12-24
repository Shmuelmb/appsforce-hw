"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "./page.module.css";
import { CardsContainer } from "@/components/CardsContainer/CardsContainer";
import Loader from "@/components/Loader/Loader";
import { useUsers } from "@/hooks/use-users";
import UseForm from "@/components/UseForm/UseForm";
import Modal from "@/components/Modal/Modal";
import { userFormFields } from "@/lib/sources";
import { AiFillMoon, AiFillSun } from "react-icons/ai";

const queryClient = new QueryClient();
function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const {
    users,
    isLoading,
    deleteUserMutation,
    updateUserMutation,
    addUserMutation,
  } = useUsers(queryClient);

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

  const toggleTheme = () => {
    document.body.setAttribute("class", isDarkMode ? "light" : "dark");
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Users Library</h1>
        <div className={styles.buttons}>
          <button onClick={() => setIsAddingUser(true)}>Add User</button>
          <button onClick={toggleTheme}>
            {isDarkMode ? <AiFillSun /> : <AiFillMoon />}
          </button>
        </div>
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

      <CardsContainer
        users={users}
        onEdit={updateUserMutation.mutate}
        onDelete={deleteUserMutation.mutate}
        onAdd={addUserMutation.mutate}
        searchTerm={searchTerm}
      />
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
