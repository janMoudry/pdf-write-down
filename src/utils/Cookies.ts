export const saveNote = ({
  title,
  description,
  priority,
  category,
  date,
}: {
  title: string;
  description: string;
  date: string;
  priority?: "Major" | "Minor" | "Regular";
  category?: "Note" | "Meeting" | "task" | "Event";
}) => {
  console.log(title, description, priority, category, date);
};
