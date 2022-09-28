const useQuestion = (handleOpenNotification) => {
  // Feel free to update this to useState
  const questionObject = null;

  // TODO: Add logic to get question from backend and return question info

  // Note: Can use handleOpenNotification to notify user in small popup if theres issues getting question from backend
  // handleOpenNotification(message, timeoutTime, type)
  // - message: Message to show user
  // - timeoutTime: time popup takes to exit in ms
  // - type: type of notification ("success" || "error")
  // Example usage: handleOpenNotification("Encounter issues retriveing questions!", 4000, "error")

  return { questionObject };
};

export default useQuestion;
