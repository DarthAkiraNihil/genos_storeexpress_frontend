import {Navigate} from "react-router-dom"
import {useAuth} from "context/AuthContext"
import {UserRole} from "models/auth";
import React from 'react';


export const ProtectedRoute: React.FC<{
    children: React.ReactElement;
    allowAdmin?: boolean;
    allowCustomers?: boolean;
}> = ({
    children,
    allowAdmin = false,
    allowCustomers = false,
}) => {

    const { user, role } = useAuth()

    console.log(user);
    if (!user) {
        console.log(`Called child po ${children}`);
        // alert("USER ANONYMOUS! ACCESS DENIED!")
        return <Navigate to="/sign_in" replace />
    } else if (allowAdmin && role !== UserRole.administrator) {
        console.log(`allow admin but is not admin`);
        // alert("ADMIN ONLY! ACCESS DENIED!")
        return <Navigate to="/sign_in" replace />
    } else if (allowCustomers && role === UserRole.administrator) {
        console.log(`allow cusotmer but is not admin`);
        // alert("CUSTOMER ONLY! ACCESS DENIED!")
        return <Navigate to="/sign_in" replace />
    }

    return children

}