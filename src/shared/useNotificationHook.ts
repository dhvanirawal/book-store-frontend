import { showNotification } from "@mantine/notifications";

type NotificationType = "error" | "success" | "info" | "warning";
interface INotificationDetail {
  id: string;
  title?: string;
  message: string;
  errorType: NotificationType;
}
const indicator = new Map<NotificationType, string>([
  ["error", "red"],
  ["success", "teal"],
  ["info", "indigo"],
  ["warning", "yellow"],
]);

const useNotificationHook = () => {
  const notify = (notificationDetail: INotificationDetail) => {
    const { errorType, message, id, title } = notificationDetail;
    showNotification({
      id,
      title,
      message,
      autoClose: 3000,
      color: indicator.get(errorType),
      // styles: () => ({
      //   root: {
      //     padding: "1.2rem 0.5rem",
      //   },
      //   body: {
      //     paddingLeft: "1rem",
      //   },
      // }),
    });
  };

  return { notify };
};

export default useNotificationHook;
