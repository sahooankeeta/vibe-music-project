import { toast } from "react-toastify";
const notify = (t, message) => {
    toast(message, { type: t });
  };
  export default notify;