import "./ToDoItem.css";

const ToDoItem = (props) => {
  const { title, description, isCompleted,id,deleteHandler,updateHandler } = props;
  const markIsCompleteHandler = () => {
    updateHandler(id)  
  };
  return (
    <div className="task">
      <div className="task-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="task-checkbox">
        <input type="checkbox" checked={isCompleted} onClick={markIsCompleteHandler}/>
        <button onClick={()=>{deleteHandler(id)}}>Delete</button>
      </div>
    </div>
  );
};

export default ToDoItem;
