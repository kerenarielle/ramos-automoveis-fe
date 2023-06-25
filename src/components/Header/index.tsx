import React, { useCallback, useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import LogoRamos from "../../assets/ramos.png";

import "./index.css";
import { Link } from "@mui/material";
import { useAuth } from "../../contexts/auth";

const pages = [
  {
    label: "Início",
    redirect: "/",
  },
  {
    label: "Listagem",
    redirect: "/listagem",
  },
  {
    label: "Cadastro de veículos",
    redirect: "/adicionar",
  },
];

const ResponsiveAppBar = () => {
  const { Logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleLogout = () => Logout();

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleRedirect = useCallback(
    (value: any) => window.location.assign(value),
    []
  );

  return (
    <AppBar position="static" className="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href="/home" className="logo logo-default">
            <img src={LogoRamos} alt="Ramos Automoveis" />
          </a>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ label, redirect }) => (
                <MenuItem key={label} onClick={() => handleRedirect(redirect)}>
                  <Typography textAlign="center">{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <a href="/" className="logo">
              <img src={LogoRamos} alt="Ramos Automoveis" />
            </a>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            {pages.map(({ redirect, label }) => (
              <Link
                className="link"
                key={label}
                href={redirect}
                sx={{ my: 2, color: "#3c3c3c", display: "block" }}
              >
                {label}
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleLogout} sx={{ p: 0 }} className="logout">
              Desconectar
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
