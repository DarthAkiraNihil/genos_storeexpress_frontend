import {Navigate} from "react-router"
import {UserData, UserRole} from "models/auth";
import React from 'react';
import { AuthApi } from "services/api/AuthApiService";


export const ProtectedRoute: React.FC<{
    children: React.ReactElement;
    allowAdmin?: boolean;
    allowCustomers?: boolean;
}> = ({
    children,
    allowAdmin = false,
    allowCustomers = false,
}) => {

    const token = AuthApi.getToken();

    let user: UserData | undefined = undefined;
    if (localStorage.getItem("user") != null) {
        const userData = JSON.parse(localStorage.getItem("user")!);

        user = {
            token: token!,
            username: userData.username,
            role: userData.role,
        }

    }

    console.log(user?.role);
    if (!user && !token) {
        // alert("USER ANONYMOUS! ACCESS DENIED!")
        return <Navigate to="/sign_in" replace />
    } else if (allowAdmin && !allowCustomers && user?.role !== UserRole.administrator) {
        // alert("ADMIN ONLY! ACCESS DENIED!")
        return <Navigate to="/sign_in" replace />
    } else if (allowCustomers && !allowAdmin && user?.role === UserRole.administrator) {
        // alert("CUSTOMER ONLY! ACCESS DENIED!")
        return <Navigate to="/sign_in" replace />
    } else if (allowCustomers && allowAdmin) {
        return children;
    }

    return children

}