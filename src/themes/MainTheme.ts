import {createTheme} from "@mui/material/styles";

const MainTheme = createTheme({
    typography: {
        fontFamily: '"JetBrains Mono", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightMedium: 400,
        fontWeightBold: 500
    },
    palette: {
        primary: {
            main: '#A0CDFF'
        },
        secondary: {
            main: '#7DFFCD'
        }
    }
})

export default MainTheme;