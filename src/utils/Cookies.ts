import Cookie from "js-cookie";

export const saveNote = (data: CookiesData) => {
  const cookieData = getNotes();

  if (cookieData) {
    Cookie.set(
      "notes",
      //@ts-ignore
      JSON.stringify([...JSON.parse(cookieData), data]),
    );
  } else {
    Cookie.set("notes", JSON.stringify([data]));
  }
};

export const getNotes = () => Cookie.get("notes");

export type CookiesData = {
  title: string;
  description: string;
  date: string;
  priority: "Major" | "Minor" | "Regular";
  category: "Note" | "Meeting" | "Task" | "Event";
};

export const clearAllCookies = () => {
  Cookie.remove("notes");
  window.location.reload();
};

export const deleteOneNote = (currentTitle: string) => {
  const savedData = getNotes();

  if (savedData) {
    const newData = JSON.parse(savedData).filter(
      ({ title }: { title: string }) => title !== currentTitle,
    );
    Cookie.set("notes", JSON.stringify(newData));

    window.location.reload();
  }
};
