import styles from "./Modal.module.css";

type Props = {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ children, title, isOpen, onClose }: Props) {
  return (
    <div
      className={styles.modal}
      onClick={onClose}
      style={{ display: isOpen ? "flex" : "none" }}>
      <div
        className={styles.modalContent}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <button className={styles.close} onClick={onClose}>
          X
        </button>
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}
