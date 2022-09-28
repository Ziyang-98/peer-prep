export const getNewLines = (noOfLines) => {
  let newLines = "";
  for (let i = 1; i < noOfLines; i++) {
    newLines += "\n";
  }
  return newLines;
};
