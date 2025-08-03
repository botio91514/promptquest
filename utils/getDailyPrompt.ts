const prompts = [
  "Design a city powered by dreams.",
  "Write a message to your future AI assistant.",
  "Invent a new subject for schools in 2120.",
  "Describe a creature that lives on the moon.",
  "Create a new sport using gravity.",
];

export const getDailyPrompt = () => {
  const date = new Date().toISOString().split("T")[0];
  const seed = parseInt(date.replace(/-/g, ""));
  return prompts[seed % prompts.length];
};

export const getDailyQuestId = () => {
  const day = new Date().toISOString().split("T")[0];
  return `daily-${day}`;
};

export const isDailyQuestCompleted = (completedQuests: string[]) => {
  const todayQuestId = getDailyQuestId();
  return completedQuests.includes(todayQuestId);
};