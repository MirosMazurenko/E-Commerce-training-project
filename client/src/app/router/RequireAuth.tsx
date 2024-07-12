import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore"
import { Outlet } from "@mui/icons-material";

export default function RequireAuth() {
    const { user } = useAppSelector(state => state.account);
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }}></Navigate>
    }

    return <Outlet />
}