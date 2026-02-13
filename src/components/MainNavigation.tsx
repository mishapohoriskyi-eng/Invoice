import { Box, styled } from "@mui/material";
import { useState } from "react";
import colors from "../styles/colors";
import ListItem from "@mui/material/ListItem";
import { NavLink } from "react-router-dom";
import { routes } from "../utils/routes";

const MainNavigation = () => {
  const [menuActive, setMenuActive] = useState(false);
  const closeMenu = () => {
    setMenuActive(false);
  };

  return (
    <>
      <MainNavigationBLock>
        <MainNavigationSection className={menuActive ? "active" : "none"}>
          <Menu>
            <ListItem>
              <NavLink
                onClick={closeMenu}
                to={routes.HOME}
                data-testid="home_on_sidebar"
              >
                Накладна
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                onClick={closeMenu}
                to={routes.POWER_ATTORNEY}
                data-testid="home_on_sidebar"
              >
                Довіреність
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                onClick={closeMenu}
                to={routes.SCORE}
                data-testid="home_on_sidebar"
              >
                Рахунок
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                onClick={closeMenu}
                to={routes.PRICE_PRODUCT}
                data-testid="home_on_sidebar"
              >
                Ціна
              </NavLink>
            </ListItem>
          </Menu>
        </MainNavigationSection>
      </MainNavigationBLock>
    </>
  );
};

const MainNavigationBLock = styled(Box)(({ theme }) => ({
  "& li a": {
    display: "flex",
    color: "colors.white",
  },
  "& .active": {
    display: "flex",
  },
}));

const MainNavigationSection = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isAdmin",
})<{
  isAdmin?: boolean;
}>(({ theme, isAdmin = false }) => ({
  position: "fixed",
  top: "0",
  left: "0",
  width: "250px",
  height: "100%",
  borderRight: `1px solid ${colors.grey}`,
  zIndex: "900",
  [theme.breakpoints.down("md")]: {
    ".none": {
      display: "none",
    },
    width: "100%",
  },
}));

const Menu = styled(Box)(({ theme }) => ({
  "& li": {
    fontSize: "18px",
    lineHeight: "25px",
    padding: "0 0 0 0",
    display: "block",
    border: `1px solid ${colors.grey}`,
  },
  "& li > a": {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    padding: "20px 0 20px 30px",
    width: "100%",
    opacity: "0.5",
    transition: "all .3s linear",
    color: colors.black,
  },
  "& li > a.active": {
    opacity: "1",
  },
  [theme.breakpoints.down("lg")]: {
    padding: "40px 0 0 0",
    "& li": {
      fontSize: "22px",
      lineHeight: "25px",
      padding: "0 0 30px 25px",
    },
  },
}));

export default MainNavigation;
