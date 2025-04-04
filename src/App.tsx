import "@fontsource/jetbrains-mono";
import './App.css';
import React from "react"
import { ThemeProvider } from '@mui/material/styles'
import MainTheme from "./themes/MainTheme";
import GenosStorExpressRouter from "./utils";
import {RouterProvider} from "react-router";


const App: React.FC = () => {
    return (
        <ThemeProvider theme={MainTheme}>
            <RouterProvider router={GenosStorExpressRouter} />
        </ThemeProvider>
    )
}

export default App;
