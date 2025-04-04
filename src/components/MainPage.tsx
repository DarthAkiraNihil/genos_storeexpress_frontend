import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import 'styles/MainPage.css';
import 'styles/Common.css';
import React from 'react';
import {Grid} from "@mui/system";

type content = [header: string, content: string];

const whyUsContent: content[] = [
    [
        "penis music",
        "penis music penis music",
    ],
    [
        "Dr. K.Y.S. должна гореть в аду",
        "Сдохни, тварь ебаная. Pls suck some dick",
    ],
    [
        "Чёрный треугольник + оранжевый треугольник =",
        "Морковный пирог",
    ]
]

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
            <div className="mainPageContent">
                <h1 className="whyUsHeader">
                    Почему вам стоит выбрать нас?
                </h1>
                <Grid container spacing={2} className="whyUs">
                    {
                        whyUsContent.map((item, i) => (
                            <Grid size={4}>
                                <h2>
                                    { item[0] }
                                </h2>
                                <p>
                                    { item[1] }
                                </p>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    );
};


export default MainPage;
