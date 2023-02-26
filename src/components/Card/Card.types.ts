interface CardProps {
  title: string;
  blocks: {
    priority: "major" | "minor" | "Regular";
    category: "Note" | "Meeting" | "Task" | "Event";
    date: string;
  };
  description: string;
}

export default CardProps;
