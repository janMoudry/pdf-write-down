import { Card } from "components";
import { AppContext } from "contexts/useOpenEditContext";
import React, { useContext, useLayoutEffect, useState } from "react";
import { CookiesData, getNotes } from "utils/Cookies";
import "./styles/Home.css";

const Home: React.FC = () => {
  const [notes, setNotes] = useState<Array<CookiesData>>([]);

  const { isOpen } = useContext(AppContext);

  useLayoutEffect(() => {
    const res = getNotes();

    if (res) {
      setNotes(JSON.parse(res));
    }
  }, [isOpen]);

  return (
    <div className="home">
      <h1 className="main_title"> Take a note!!! </h1>
      <div className="cards_container">
        {notes.length &&
          notes.map(({ title, description, priority, category, date }) => (
            <Card
              key={title}
              title={title}
              description={description}
              blocks={{
                priority: priority,
                category: category,
                date: date,
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
