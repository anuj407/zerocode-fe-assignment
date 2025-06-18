import toast from "react-hot-toast";

export  const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  toast.success("Logged out successfully");
  window.location.href = "/login";
};
