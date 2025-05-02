import { ResponsiveAppBar } from "./common";
import React from "react";
import { Outlet } from "react-router";
import 'styles/Common.css';
import {Footer} from "./Footer";

const GenosStorExpressLayout: React.FC = () => {
    return (
        <div>
            <ResponsiveAppBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default GenosStorExpressLayout;
