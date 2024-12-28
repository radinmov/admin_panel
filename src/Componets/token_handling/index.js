import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const useTokenHandling = () => {
    const navigate = useNavigate();

    const checkToken = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "Unauthorized",
                text: "You need to log in to access this page.",
                confirmButtonText: "Log In",
            }).then(() => {
                navigate("/"); // Redirect to login page
            });
            return false; // Indicate the user is unauthorized
        }
        return true; // Indicate the user is authorized
    };

    return { checkToken };
};
