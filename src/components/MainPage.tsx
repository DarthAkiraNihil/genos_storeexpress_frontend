import React from 'react';
import { Link } from "react-router-dom";
import '../styles/MainPage.css'


const MainPage: React.FC = () => {

    return (
        <div className="mainPageRoot">
            <div>
                <h1 className="mainPageContent">
                    This is the main page so far! (а пока только такая goofy ahh страница)
                </h1>
                <Link to={`items/`}>К каталогу товаров</Link>
            </div>
        </div>
    );
};


export default MainPage;
