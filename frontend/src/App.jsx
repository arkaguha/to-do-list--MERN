// App.jsx

import { useEffect, useState } from "react";
import axios from "axios";
const BASE_API = "http://localhost:3000";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

export default function App() {
  const [lists, setLists] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [listContent, setListContent] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${BASE_API}/lists`);
      setLists(res.data);
    } catch (error) {
      console.error("Error fetching lists:", error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      let res = await axios.delete(`${BASE_API}/lists/${id}`);
      console.log(res);

      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Edit Todo
  function editTodo(id, list_title, list_content) {
    setListTitle(list_title);
    setListContent(list_content);
    setEditId(id);
  }

  // ✅ Add or Update Todo
  const saveTodo = async () => {
    if (!listTitle.trim() || !listContent.trim()) {
      alert("Please fill in both title and content!");
      return;
    }
    try {
      if (editId) {
        await axios.put(`${BASE_API}/lists/${editId}`, {
          list_title: listTitle,
          list_content: listContent,
        });
        setEditId(null);
      } else {
        await axios.post(`${BASE_API}/lists`, {
          list_title: listTitle,
          list_content: listContent,
        });
      }
      fetchTodos();
      setListTitle("");
      setListContent("");
    } catch (error) {
      console.error(
        "Error saving list:",
        error.response?.data?.message || error.message
      );
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setListTitle("");
    setListContent("");
  };

  return (
    <>
      <div>
        <TodoForm
          editId={editId}
          listTitle={listTitle}
          listContent={listContent}
          setListTitle={setListTitle}
          setListContent={setListContent}
          saveTodo={saveTodo}
          cancelEdit={cancelEdit}
        />
      </div>
      <div>
        <Todo editTodo={editTodo} deleteTodo={deleteTodo} lists={lists} />
      </div>
    </>
  );
}
