interface CardProps {
  title: string;
  blocks: {
    priority: "Major" | "Minor" | "Regular";
    category: "Note" | "Meeting" | "Task" | "Event";
    date: string;
  };
  description: string;
}

export default CardProps;
