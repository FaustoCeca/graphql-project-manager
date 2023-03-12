import TaskCard from "./TaskCard";

const TaskList = ({tasks}) => {
  return (
    <div>
      {
        tasks.map(task => (
          <TaskCard key={task._id} task={task} />
        ))
      }
      {
        tasks.length === 0 && <p>No tasks yet</p>
      }
    </div>
  )
}

export default TaskList;