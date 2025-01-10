import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const useTokenHandling = () => {
    const navigate = useNavigate();

    const checkToken = () => {
        const token = localStorage.getItem("token");

        if (!token || token.length <= 228) {
            Swal.fire({
                icon: "warning",
                title: "Unauthorized",
                text: "Invalid or expired token. Please log in again.",
                confirmButtonText: "Log In",
            }).then(() => {
                localStorage.removeItem("token");

                navigate("/");
            });
            return false;
        }

        return true;
    };

    return { checkToken };
};
