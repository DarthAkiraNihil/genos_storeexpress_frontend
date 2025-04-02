import "@fontsource/jetbrains-mono";
import './App.css';
import ItemsList from './components/ItemsList';
import { ItemProvider } from './context/ItemContext';
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ItemDetails from './components/ItemDetails';
import ItemForm from './components/ItemForm';
import MainPage from "./components/MainPage";
import ResponsiveAppBar from "./components/common";



const App: React.FC = () => {
    return (
        <>
            <ResponsiveAppBar />
            <ItemProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/items/add" element={<ItemForm/>} />
                        <Route path="/items" element={<ItemsList />} />
                        <Route path="/items/:id" element={<ItemDetails />} />
                    </Routes>
                </Router>
            </ItemProvider>
        </>
    )
}

export default App;
