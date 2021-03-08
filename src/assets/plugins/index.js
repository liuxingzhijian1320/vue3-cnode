import Message from "./Message";
import Toast from "./Toast";

export default function usePluginsEffect(app) {
  app.use(Message);
  app.use(Toast);
}
