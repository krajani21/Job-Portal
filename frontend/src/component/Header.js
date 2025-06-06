import { Box, styled } from "@mui/material";
import React from "react";
import SearchInputEl from "./searchInput";
import headerImage from "../images/jobbg.jpg"

const StyledHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 400,
  backgroundImage: `url(${headerImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: theme.palette.secondary.main,
}));

const Header = () => {
  return (
    <StyledHeader>
      <SearchInputEl/>
        
    </StyledHeader>
  );
};

export default Header;
