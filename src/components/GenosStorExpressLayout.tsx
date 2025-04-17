import { ResponsiveAppBar } from "./common";
import {ItemProvider} from "../context";
import React from "react";
import { Outlet } from "react-router-dom";
import {CartProvider} from "context/CartContext";

const GenosStorExpressLayout: React.FC = () => {
    return (
        <div className="root">
            <ResponsiveAppBar />
            <Outlet />
        </div>
    )
}

export default GenosStorExpressLayout;
