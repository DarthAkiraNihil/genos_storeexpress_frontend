import { ThemeProvider } from '@mui/material/styles'
import GenosStorExpressRouter from "./utils";
import {RouterProvider} from "react-router";
import MainTheme from "./themes/MainTheme";
import { AuthProvider } from 'context';
import "@fontsource/jetbrains-mono";
import React from "react";
import './App.css';


const App: React.FC = () => {
    return (
        <ThemeProvider theme={MainTheme}>
            <AuthProvider>
                <RouterProvider router={GenosStorExpressRouter} />
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App;
