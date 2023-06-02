import { showNotification } from "@mantine/notifications";

interface SuccessModalProps {
  title: string;
  message: string;
}

const SuccessModal = ({ title, message }: SuccessModalProps) => {
  showNotification({
    color: "green",
    title,
    message,
  });
};

const ErrorModal = ({ title, message }: SuccessModalProps) => {
  showNotification({
    color: "red",
    title,
    message,
  });
};


  const feedBackModals = {
  SuccessModal,
  ErrorModal,
};


export default feedBackModals;
