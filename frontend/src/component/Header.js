import { Box, styled } from "@mui/material";
import React from "react";

const StyledHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 400,
  backgroundImage: `url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZsb3dlcnxlbnwwfHx8fDE2ODQ5NTY1MjE&ixlib=rb-4.0.3&q=80&w=1080")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: theme.palette.secondary.main,
}));

const Header = () => {
  return (
    <StyledHeader>
        
    </StyledHeader>
  );
};

export default Header;
