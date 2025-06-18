import toast from "react-hot-toast";

export  const Logout = () => {
  localStorage.removeItem("token");
  toast.success("Logged out successfully");
  window.location.href = "/login";
};
