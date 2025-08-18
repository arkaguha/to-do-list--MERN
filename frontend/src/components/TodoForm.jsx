import "./TodoForm.css";

export default function TodoForm({
  editId,
  listTitle,
  listContent,
  setListTitle,
  setListContent,
  saveTodo,
  cancelEdit,
}) {
  return (
    <div className={`todo-form slide-in ${editId ? "editing" : ""}`}>
      {editId ? (
        <p className="form-header">Editing: {listTitle}</p>
      ) : (
        <p className="form-header">Add new to-do</p>
      )}

      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setListTitle(e.target.value)}
        value={listTitle}
      />
      <textarea
        placeholder="Content"
        onChange={(e) => setListContent(e.target.value)}
        value={listContent}
      />

      <div className="form-buttons">
        <button className="primary" onClick={saveTodo}>
          {editId ? "Save" : "Add"}
        </button>
        {
          /*editId && */ <button className="secondary" onClick={cancelEdit}>
            Cancel
          </button>
        }
      </div>
    </div>
  );
}
