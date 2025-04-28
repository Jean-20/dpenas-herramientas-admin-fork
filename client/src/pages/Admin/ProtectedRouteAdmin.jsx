import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContextAdmin"

function ProtectedRouteAdmin() {
    const { loading ,isAuthenticated } = useAuth();
    console.log(loading, isAuthenticated)

    if(loading) return <h1>
        Loading...
    </h1>
    if(!loading && !isAuthenticated) return <Navigate to='/Admin-Login' replace />

    return <Outlet/>
}

export default ProtectedRouteAdmin