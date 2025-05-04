import Button from '@mui/material/Button';
import { Link } from "react-router";
import '../styles/MainPage.css';
import '../styles/Common.css';
import React from 'react';

const MainPage: React.FC = () => {

    return (
        <div className="mainPageRoot">

            <div className="center mainPageWelcomeMessage">
                <h1>
                    Добро пожаловать в GenosStorExpress
                </h1>
                <h2>
                    GenosStorExpress - место, где вы приобретёте технику мечты мощно и быстро!
                </h2>
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
