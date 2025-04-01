
import React from 'react';
import { Link, useNavigate} from "react-router-dom";
import '../styles/MainPage.css'


const MainPage: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="mainPage">
            <h1>
                Main Dis is da main page!
            </h1>
        </div>
    );
};


export default MainPage;
