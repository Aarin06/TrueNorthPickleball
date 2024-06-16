import { Button, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Join() {
  return (
    <Container maxWidth>
      <h1 className="page-title">Join Now</h1>
      <Button LinkComponent={Link} to="/signup" variant="contained">
        Register
      </Button>
    </Container>
  );
}

export default Join;
