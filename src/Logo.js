import React from "react";
import { Container } from "@mui/material";

const Logo = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ paddingLeft: 20, paddingRight: 20 }}
    >
      <img src="https://www.shootthemoon.co.uk/wp-content/uploads/2020/06/final_logo_white.png" alt="Logo" className="logo" />
    </Container>
  );
};

export default Logo;
