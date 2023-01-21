const TaskRow = ({ task, toggleTask }) => {
  return (
    <tr>
      <td className="d-flex justify-content-between">
        {task.name}
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={task.done}
            onChange={() => {
              toggleTask(task);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
