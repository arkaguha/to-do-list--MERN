// App.jsx
import "./App.css";
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
  const [activeId, setActiveId] = useState(null);
  const [showForm, setShowForm] = useState(false); // 👈 modal toggle

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleActive = (id) => {
    setActiveId(activeId === id ? null : id);
  };

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
      if (id === editId) {
        cancelEdit();
      }
      alert("deleted");
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
    setShowForm(true); // open modal when editing
    if (id !== activeId) {
      handleActive(id);
    }
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
      setShowForm(false); // close modal after save
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
    setActiveId(null);
    setShowForm(false); // close modal
  };

  return (
    <div className="app">
      <Todo
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        lists={lists}
        activeId={activeId}
        setActiveId={setActiveId}
        handleActive={handleActive}
      />

      {/* ✅ Floating Add Button */}
      <button className="fab" onClick={() => setShowForm(true)}>
        ＋
      </button>

      {/* ✅ Modal TodoForm */}
      {showForm && (
        <div className="modal-overlay" onClick={cancelEdit}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent close on form click
          >
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
        </div>
      )}
    </div>
  );
}
