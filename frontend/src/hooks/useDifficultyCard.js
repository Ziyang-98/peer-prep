import { useState } from "react";

const useDifficultyCard = (difficulty) => {
  const [raised, setRaised] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const toggleRaised = () => setRaised(true);
  const toggleUnraised = () => setRaised(false);

  const handleCardClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    toggleUnraised();
    setOpenDialog(false);
  };
  return {
    cardProps: {
      raised,
      onMouseOver: toggleRaised,
      onMouseOut: toggleUnraised,
    },
    dialogProps: {
      difficulty,
      open: openDialog,
      handleClose: handleDialogClose,
    },
    handleCardClick,
  };
};

export default useDifficultyCard;
