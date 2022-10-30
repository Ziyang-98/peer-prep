const useHistory = () => {
  const handleQuestionClick = (titleSlug) => {
    console.dir(titleSlug);
  };

  return {
    handleQuestionClick,
  };
};

export default useHistory;
