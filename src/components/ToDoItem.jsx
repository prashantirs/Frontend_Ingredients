import "./ToDoItem.css";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useContext } from "react";
import { Context } from "../main";
const ToDoItem = (props) => {
  const { title, description, isCompleted, id, deleteHandler, updateHandler } =
    props;
  const { loading } = useContext(Context);
  const markIsCompleteHandler = () => {
    updateHandler(id);
  };
  return (
    <div className="task">
      <div className="task-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="task-checkbox">
        {isCompleted ? (
          <TaskAltIcon
            style={{ color: "Green", cursor: "pointer" }}
            onClick={markIsCompleteHandler}
          />
        ) : (
          <p>
            <RadioButtonUncheckedIcon
              style={{ color: "Grey", cursor: "pointer" }}
              onClick={markIsCompleteHandler}
            />
          </p>
        )}
        <button
          onClick={() => {
            deleteHandler(id);
          }}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
