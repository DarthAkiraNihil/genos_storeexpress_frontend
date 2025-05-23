import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import CardMedia from "@mui/material/CardMedia";
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Card from "@mui/material/Card";
import { useNavigate, Link } from 'react-router';
import { useAuth } from 'context'
import { AppConstants } from "const";
import Box from '@mui/material/Box';
import * as React from 'react';
import {UserRole} from "../../models/auth";

export function ResponsiveAppBar() {

    const { user, signOut } = useAuth();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate()

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSignOut = () => {
        signOut()
        navigate("")
    }

    const pages = user ? (user.role === UserRole.administrator ? [
            {
                link: '/items',
                name: 'Каталог товаров',
            },
            {
                link: '/order',
                name: 'Управление активными заказами',
            },
            {
                link: '/legal_entities',
                name: 'Управление верификацией юридических лиц'
            },
            {
                link: '/sales_report',
                name: 'Отчёт по продажам'
            },
            {
                link: '/discounts',
                name: 'Управление скидками'
            },
        ] : [
            {
                link: '/items',
                name: 'Каталог товаров',
            },
            {
                link: '/cart',
                name: 'Корзина',
            },
            {
                link: '/cards',
                name: 'Банковские карты',
            },
            {
                link: '/order',
                name: 'История заказов',
            }
    ]) : [];

    const settings = [{
        text: 'Выйти',
        handler: handleSignOut,
    }]

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Card sx={{ display: 'flex', backgroundColor: 'transparent', marginRight: '8px' }} elevation={0}>
                        <CardMedia
                            component="img"
                            image={"/img/Logo.png"}
                            alt={"logo"}
                            sx={{
                                width:'32px',
                                height: '48px',
                                display: { xs: 'none', md: 'flex' },
                                flexDirection: 'column',
                            }}
                        />
                    </Card>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {AppConstants.appNameNormalized}
                    </Typography>

                    {user ? (
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page, index) => (
                                    <Link to={page.link}>
                                        <MenuItem key={`app-bar-page-${index}`} onClick={handleCloseNavMenu}>
                                            <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>
                    ) : (
                        <div />
                    )}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Link to={page.link}>
                                <Button
                                    key={`app-bar-page-${index}`}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    { user ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Открыть меню">
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    onClick={handleOpenUserMenu}
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        color: 'inherit',
                                    }}
                                >
                                    { user?.username }
                                </Typography>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting.text} onClick={setting.handler}>
                                        <Typography sx={{ textAlign: 'center' }}>{setting.text}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    ) : (
                        <div />
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}