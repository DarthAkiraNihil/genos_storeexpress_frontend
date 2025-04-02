import React from 'react';
import { Link } from "react-router-dom";
import '../styles/MainPage.css'


const MainPage: React.FC = () => {

    return (
        <div className="mainPageRoot">
            <div className="mainPageContent">
                <h1>GenosStorExpress - магазин компьютерной техники</h1>
                <h1>
                    This is the main page so far! (а пока только такая goofy ahh страница)
                </h1>
                <Link to={`items/`}>К каталогу товаров</Link>
            </div>
        </div>
    );
};


export default MainPage;
