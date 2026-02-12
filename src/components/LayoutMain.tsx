import {Outlet} from "react-router-dom";
import MainNavigation from "./MainNavigation";
import {Box, styled} from "@mui/material";

const LayoutMain = () => {
  return (
    <LayoutMainSection>
      <LayoutMainIndent>
        <MainNavigation />
      </LayoutMainIndent>
      <MainInfo>
        <Outlet />
      </MainInfo>
    </LayoutMainSection>
  );
};

const LayoutMainSection = styled(Box)({
  display: "flex",
});

const LayoutMainIndent = styled(Box)({
  margin: "0",
  padding: "0 0 0 0px",
  flex: "0 0 250px",
});

const MainInfo = styled(Box)({
  width: "100%",
  padding: "25px",
});

export default LayoutMain;
