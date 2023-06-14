// Importing required dependency
import { showNotification } from "@mantine/notifications";

// Interface for the props of success and error modals
interface SuccessModalProps {
  title: string;
  message: string;
}

// Component for displaying a success notification modal
const SuccessModal = ({ title, message }: SuccessModalProps) => {
  showNotification({
    color: "green",
    title,
    message,
  });
};

// Component for displaying an error notification modal
const ErrorModal = ({ title, message }: SuccessModalProps) => {
  showNotification({
    color: "red",
    title,
    message,
  });
};

// Object that holds the success and error modal components
const feedBackModals = {
  SuccessModal,
  ErrorModal,
};

export default feedBackModals;
