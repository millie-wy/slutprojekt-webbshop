import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Badge,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import cartIcon from "../assets/icons/icon-shopping-cart.webp";
import userIcon from "../assets/icons/icon-user.webp";
import logo from "../assets/images/logo.svg";
import { useCart } from "../context/CartContextProvider";
import { useUser } from "../context/UserContextProvider";
import { sumQuantity } from "../Helper";

interface Page {
  label: string;
  href: string;
}

function Header() {
  const { cart } = useCart();
  const { handleSignOut, currentUser } = useUser();
  const [open, setOpen] = useState(false);
  const [anchorMenu, setAnchorMenu] = useState(false);
  const { ccLogo, icon, iconsContainer, quantityIcon } = useStyles();

  const menuLeft: Page[] = [
    {
      label: "Furniture",
      href: "/furniture",
    },
    {
      label: "Textiles",
      href: "/textiles",
    },
    {
      label: "Lighting",
      href: "/lighting",
    },
  ];

  const menuRight: Page[] = [
    {
      label: "Decoration",
      href: "/decoration",
    },
    {
      label: "Inspiration",
      href: "/inspiration",
    },
  ];

  const handleOpenMenu = () => setAnchorMenu(true);
  const handleCloseMenu = () => setAnchorMenu(false);
  const handleOpen = () => (open ? setOpen(false) : setOpen(true));
  const handleClose = () => setOpen(false);

  const icons = () => {
    return (
      <div className={iconsContainer} style={{ gap: ".5rem"}}>
        <Typography sx={{ cursor: "pointer" }} onClick={handleOpen}>
          <img className={icon} src={userIcon} alt="userIcon" />
        </Typography>

        {!currentUser ? (
          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: "#6C665F",
                marginTop: "5rem",
                marginRight: "5rem",
                width: "8rem",
                height: "fit-content",
                py: "1rem",
              },
            }}
            anchor="right"
            open={open}
            onClose={handleClose}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link
                to="/login"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  textDecoration: "none",
                  color: "white",
                  placeContent: "center",
                  placeItems: "center",
                }}
              >
                <Typography
                  fontFamily="Prata"
                  variant="body2"
                  sx={{
                    textTransform: "capitalize",
                    textAlign: "center",
                    marginBottom: "1.2rem",
                  }}
                >
                  Sign In
                </Typography>
              </Link>
              <Link
                to="/signup"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  textDecoration: "none",
                  color: "white",
                  placeContent: "center",
                  placeItems: "center",
                }}
              >
                <Typography
                  fontFamily="Prata"
                  variant="body2"
                  sx={{ textTransform: "capitalize", textAlign: "center" }}
                >
                  Sign Up
                </Typography>
              </Link>
            </Box>
          </Drawer>
        ) : currentUser?.isAdmin ? (
          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: "#6C665F",
                marginTop: "5rem",
                marginRight: "5rem",
                width: "8rem",
                height: "7rem",
                padding: ".5rem",
              },
            }}
            anchor="right"
            open={open}
            onClose={handleClose}
          >
            <Link
              to="/admin-products"
              style={{
                display: "flex",
                flexDirection: "row",
                textDecoration: "none",
                color: "white",
                placeContent: "center",
                placeItems: "center",
              }}
            >
              <Typography
                fontFamily="Prata"
                variant="body2"
                sx={{
                  textTransform: "capitalize",
                  textAlign: "center",
                  marginTop: ".5rem",
                  color: "white",
                }}
              >
                Products
              </Typography>
            </Link>

            <Link
              to="/admin-orders"
              style={{
                display: "flex",
                flexDirection: "row",
                textDecoration: "none",
                color: "white",
                placeContent: "center",
                placeItems: "center",
              }}
            >
              <Typography
                fontFamily="Prata"
                variant="body2"
                sx={{
                  textTransform: "capitalize",
                  textAlign: "center",
                  marginTop: "1rem",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Orders
              </Typography>
            </Link>
            <Typography
              fontFamily="Prata"
              variant="body2"
              onClick={handleSignOut}
              sx={{
                textTransform: "capitalize",
                textAlign: "center",
                marginTop: "1rem",
                color: "white",
                cursor: "pointer",
              }}
            >
              Logout
            </Typography>
          </Drawer>
        ) : (
          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: "#6C665F",
                marginTop: "5rem",
                marginRight: "5rem",
                width: "8rem",
                height: "fit-content",
                py: "1rem",
              },
            }}
            anchor="right"
            open={open}
            onClose={handleClose}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontFamily="Prata"
                  variant="body2"
                  sx={{
                    textTransform: "capitalize",
                    textAlign: "center",
                    marginBottom: "1.2rem",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  My orders
                </Typography>
              </Box>
              <Typography
                fontFamily="Prata"
                variant="body2"
                onClick={handleSignOut}
                sx={{
                  textTransform: "capitalize",
                  textAlign: "center",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Logout
              </Typography>
            </Box>
          </Drawer>
        )}

        <Link className={quantityIcon} to="/checkoutpage">
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={sumQuantity(cart)}
            color="warning"
          >
            <img className={icon} src={cartIcon} alt="cart" />
          </Badge>
        </Link>
      </div>
    );
  };

  const getMenuButtonsLeft = () => {
    return menuLeft.map(({ label, href }) => {
      return (
        <Button
          component={Link}
          {...{
            key: label,
            color: "inherit",
            to: href,
          }}
          sx={{
            textTransform: "capitalize",
            fontFamily: "Prata",
            m: "2.5rem",
            display: { xs: "none", sm: "none", md: "block", lg: "block" },
            margin: { sm: ".7rem" },
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const getMenuButtonsRight = () => {
    return menuRight.map(({ label, href }) => {
      return (
        <Button
          component={Link}
          {...{
            key: label,
            color: "inherit",
            to: href,
          }}
          sx={{
            textTransform: "capitalize",
            fontFamily: "Prata",
            m: "2.5rem",
            display: { xs: "none", sm: "none", md: "block", lg: "block" },
            margin: { sm:'.7rem' }
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "#6C665F",
        padding: "0rem 1rem",
        placeContent: "center",
        display: "flex",
        flexDirection: "row",
        height: "6rem",
        position: "sticky",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          paddingRight: {
            sm: "0",
          },
          paddingLeft: {
            sm: "0",
          },
          justifyContent: {
            xs: "space-between",
            sm: "space-between",
            md: "space-around",
            lg: "space-around",
          },
          columnGap: {
            sm: "0",
          },
          margin: {
            md: '0',
          }
        }}
      >
        <Box
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
          }}
        >
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenMenu}
            sx={{
              color: "white",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorReference="anchorPosition"
            anchorPosition={{ top: 75, left: 0 }}
            keepMounted
            open={Boolean(anchorMenu)}
            onClose={handleCloseMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {menuLeft.map((item) => (
              <MenuItem
                component={Link}
                sx={{
                  width: "200px",
                }}
                key={item.label}
                onClick={handleCloseMenu}
                to={item.href}
              >
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontFamily: "Prata",
                    fontSize: ".9rem",
                  }}
                  textAlign="center"
                >
                  {item.label}
                </Typography>
              </MenuItem>
            ))}
            {menuRight.map((item) => (
              <MenuItem
                key={item.label}
                onClick={handleCloseMenu}
                component={Link}
                to={item.href}
              >
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontFamily: "Prata",
                    fontSize: ".9rem",
                  }}
                  textAlign="center"
                >
                  {item.label}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        {getMenuButtonsLeft()}
        <Link to="/">
          <img className={ccLogo} src={logo} alt="comme ci comme ??a"></img>
        </Link>
        {getMenuButtonsRight()}
        {icons()}
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles(() => ({
  ccLogo: {
    width: "80px",
    height: "80px",
    margin: "0 1rem",
  },
  iconsContainer: {
    display: "flex",
    alignSelf: "center",
  },
  icon: {
    width: "25px",
    height: "25px",
    margin: ".5rem",
  },
  menuItems: {
    textTransform: "capitalize",
    fontFamily: "Prata",
  },
  quantityIcon: {
    textDecoration: "none",
    position: "relative",
  },
}));

export default Header;
