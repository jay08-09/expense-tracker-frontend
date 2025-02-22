import toast from "react-hot-toast";

const toastTypes = {
    success: toast.success,
    error: toast.error,
    info: toast.info,
    warn: toast.warn,
};


function CreateToast(type, message) {
    const showToast = toastTypes[type] || toast;
    showToast(message);
}

export default CreateToast;