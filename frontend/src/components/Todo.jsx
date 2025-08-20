import "./Todo.css";

export default function Todo({
  lists,
  editTodo,
  deleteTodo,
  handleActive,
  activeId,
  // completed,
  handleCompleted,
}) {
  // console.log(completed);

  return (
    <div className="todos-container">
      <p className="todos-header">To-do's {`:  ${lists.length}`} </p>
      <div className="todos">
        {lists.length === 0 ? (
          <p className="empty">No to-do items found...</p>
        ) : (
          <ol>
            {lists.map((item) => (
              <li
                onClick={() => handleActive(item._id)}
                key={item._id}
                className={`list-items ${
                  activeId === item._id ? "selected" : ""
                }`}
              >
                <div
                  className={`list-header ${
                    item.completion_status ? "completed" : ""
                  }`}
                >
                  <strong>{item.list_title}</strong>
                  <div className="li-buttons">
                    <button onClick={() => handleCompleted(item._id)}>
                      <span>Done</span>
                      <input
                        type="checkbox"
                        name=""
                        id={item._id}
                        onChange={() => handleCompleted(item._id)}
                        checked={item.completion_status}
                      />
                    </button>
                    <button
                      onClick={() =>
                        editTodo(item._id, item.list_title, item.list_content)
                      }
                    >
                      📝
                    </button>
                    <button onClick={() => deleteTodo(item._id)}>🗑️</button>
                  </div>
                </div>

                <div
                  className={`list-content ${
                    activeId === item._id ? "expanded" : "collapsed"
                  }`}
                >
                  {item.list_content}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
