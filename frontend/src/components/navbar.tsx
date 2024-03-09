// import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const pages = ["Home", "Patients"];

//App bar from MUI
export default function ResponsiveAppBar() {
   return (
      <AppBar position="static">
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <AddCircleOutlineOutlinedIcon
                  sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
               />
               <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="https://beyondmd.care/"
                  sx={{
                     mr: 2,
                     display: { xs: "none", md: "flex" },
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none",
                  }}
               >
                  BeyondMD
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                     <Link
                        key={page}
                        //Clicked on the Home link? Go to "/", if not, then go to "/name of page clicked on"
                        to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                     >
                        <Button
                           sx={{ my: 2, color: "white", display: "block" }}
                        >
                           {page}
                        </Button>
                     </Link>
                  ))}
               </Box>

               <Box sx={{ flexGrow: 0 }}>
                  <Tooltip>
                     <IconButton sx={{ p: 0 }}>
                        <Avatar alt="Marley's Avatar" src="/flower.jpg" />
                     </IconButton>
                  </Tooltip>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
}
