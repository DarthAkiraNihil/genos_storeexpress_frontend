import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import 'styles/MainPage.css';
import 'styles/Common.css';
import React from 'react';


const MainPage: React.FC = () => {

    return (
        <div className="mainPageRoot">

            <div className="center mainPageContent">
                <h1>GenosStorExpress - магазин компьютерной техники</h1>
                <h1>
                    This is the main page so far! (а пока только такая goofy ahh страница)
                </h1>
                <Link to="/items">
                    <Button variant="contained">
                        К каталогу товаров
                    </Button>
                </Link>

            </div>
        </div>
    );
};


export default MainPage;
