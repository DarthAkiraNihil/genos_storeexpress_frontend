import ResponsiveAppBar from "./common";
import {ItemProvider} from "../context";
import React from "react";
import { Outlet } from "react-router-dom";

const GenosStorExpressLayout: React.FC = () => {
    return (
        <div className="root">
            <ItemProvider>
                <ResponsiveAppBar />
                <Outlet />
            </ItemProvider>
        </div>
    )
}

export default GenosStorExpressLayout;
