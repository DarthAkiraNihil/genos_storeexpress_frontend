import './App.css';
import ItemsList from './components/ItemsList';
import { ItemProvider } from './context/ItemContext';
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ItemDetails from './components/ItemDetails';
import ItemForm from './components/ItemForm';



const App: React.FC = () => {
  return (
    <ItemProvider>
      <Router>
        <h1>GenosStorExpress - магазин компьютерной техники</h1>
        <Routes>
          <Route path="/items/add" element={<ItemForm/>} />
          <Route path="/" element={<ItemsList />} />
          <Route path="/items/:id" element={<ItemDetails />} />
        </Routes>
      </Router>
    </ItemProvider>
  )
}

export default App;
