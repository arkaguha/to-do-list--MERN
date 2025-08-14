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
    <div>
      <p>To-Do List:</p>
      {editId ? <p>Editing...{listTitle}</p> : <p>Add new to-do</p>}
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
      <button onClick={saveTodo}>{editId ? "Save" : "Add"}</button>
      {editId ? <button onClick={cancelEdit}>Cancel</button> : ""}
    </div>
  );
}
