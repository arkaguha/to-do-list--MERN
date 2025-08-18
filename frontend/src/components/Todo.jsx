import "./Todo.css";

export default function Todo({
  lists,
  editTodo,
  deleteTodo,
  handleActive,
  activeId,
}) {
  return (
    <div className="todos-container">
      <p className="todos-header">To-do's</p>
      <div className="todos">
        {lists.length === 0 ? (
          <p className="empty">No to-do items found</p>
        ) : (
          <ol>
            {lists.map((item) => (
              <li
                onClick={() => handleActive(item._id)}
                key={item._id}
                className={`list-items ${
                  activeId === item._id ? "selected fade-in" : "fade-in"
                }`}
              >
                <div className="list-header">
                  <strong>{item.list_title}</strong>
                  <div className="li-buttons">
                    <button>
                      {" "}
                      <input type="checkbox" name="" id="" />
                      <span>Done</span>
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
