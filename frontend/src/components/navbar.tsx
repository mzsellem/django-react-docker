import { MouseEvent, useState } from "react"
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const pages = ["Home", "Patients"];

// App bar from MUI
export default function ResponsiveAppBar() {
  const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event:MouseEvent<HTMLButtonElement>) => {
    setMenuEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuEl(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AddCircleOutlineOutlinedIcon
            sx={{ display: { md: "flex" }, mr: 1,}}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="https://beyondmd.care/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "darkblue",
              textDecoration: "none",
            }}
          >
            Beyond<span className="text-white">MD</span>
          </Typography>
          {/* Responsive Dropdown Menu */}
          <Box sx={{ display: { xs: "block", md: "none" }, marginLeft: "auto" }}>
            <Button
              aria-controls="responsive-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              sx={{ color: "white" }}
            >
              Menu
            </Button>
            <Menu
              id="responsive-menu"
              anchorEl={menuEl}
              open={Boolean(menuEl)}
              onClose={handleMenuClose}
            >
              <AddCircleOutlineOutlinedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1,}}
          />
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleMenuClose}>
                  <Link
                    to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {page}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Regular Navigation Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, marginLeft: "auto" }}>
            {pages.map((page) => (
              <Link
                key={page}
                to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button sx={{ color: "white" }}>{page}</Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
