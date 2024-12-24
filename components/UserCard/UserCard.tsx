import { useState } from "react";
import Image from "next/image";
import styles from "./UserCard.module.css";
import { User } from "@/types";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (showConfirm) {
      onDelete(user.id);
    } else {
      setShowConfirm(true);
    }
  };

  return (
    <figure className={styles.card}>
      <div className={styles.header}>
        <Image
          src={user.picture}
          alt={`${user.firstName} ${user.lastName}`}
          width={60}
          height={60}
          className={styles.image}
        />
        <figcaption className={styles.info}>
          <h3 className={styles.name}>
            {user.title} {user.firstName} {user.lastName}
          </h3>
          <p className={styles.email}>{user.email}</p>
          <p className={styles.location}>
            {user.streetNumber} {user.streetName},{user.city}, {user.country}
          </p>
        </figcaption>
      </div>
      <div className={styles.actions}>
        <button
          className={`${styles.button} ${styles.editButton}`}
          onClick={() => onEdit(user)}>
          Edit
        </button>
        <button
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={handleDelete}>
          {showConfirm ? "Confirm Delete" : "Delete"}
        </button>
      </div>
    </figure>
  );
}
