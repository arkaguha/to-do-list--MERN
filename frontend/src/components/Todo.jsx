export default function Todo({ lists, editTodo, deleteTodo }) {
  return (
    <div>
      <p>To-do's</p>
      {lists.length === 0 ? (
        <p>No to-do items found</p>
      ) : (
        <ul>
          {lists.map((item) => (
            <li key={item._id}>
              <div>
                <strong>{item.list_title}</strong>: {item.list_content}
              </div>
              <button
                onClick={() =>
                  editTodo(item._id, item.list_title, item.list_content)
                }
              >
                📝
              </button>
              <button onClick={() => deleteTodo(item._id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
