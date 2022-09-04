import React, { useState } from "react";
import { styles } from "./styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

const DifficultyCard = ({ difficulty }) => {
  const [raised, setRaised] = useState(false);

  const toggleRaised = () => setRaised(true);
  const toggleUnraised = () => setRaised(false);

  const handleCardClick = (difficulty) => {
    console.log(difficulty);
  };
  return (
    <Card
      raised={raised}
      onMouseOver={toggleRaised}
      onMouseOut={toggleUnraised}
    >
      <CardActionArea onClick={() => handleCardClick(difficulty.title)}>
        <CardContent>
          <Box sx={styles.cardContent}>
            <Typography gutterBottom variant="h5" component="span">
              {difficulty.title}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DifficultyCard;
