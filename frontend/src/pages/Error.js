import React from "react";
import { Container, Typography, Box } from "@mui/material";


function Error() {
  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h2" className="text-4xl font-bold mb-8">
          This Page Does Not Exist.
        </Typography>
      </Box>
  
    </Container>
  );
}

export default Error;
