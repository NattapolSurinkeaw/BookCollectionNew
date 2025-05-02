import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const access_token = localStorage.getItem("accessToken");
        const isLogin = localStorage.getItem("isLogin");

        if (access_token && isLogin) {
            setIsAuthenticated(true);
        } else {
            localStorage.clear();
            setIsAuthenticated(false);
        }
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // หรือใส่ Skeleton UI
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectRoute;
