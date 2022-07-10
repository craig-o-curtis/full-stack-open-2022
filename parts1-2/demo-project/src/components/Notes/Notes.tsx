import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heading, Loader } from "../common";

interface INote {
  id: number;
  content: string;
  date: string;
  important: boolean;
}

const Notes = () => {
  const [notes, setNotes] = useState<INote[]>();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/notes");
        console.log(data);
        //   setNotes(notes);
        setNotes(data);
      } catch (error) {}
    };

    getNotes();
  }, []);

  return (
    <div>
      <Heading>Notes</Heading>
      {!notes ? (
        <Loader />
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.content}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
