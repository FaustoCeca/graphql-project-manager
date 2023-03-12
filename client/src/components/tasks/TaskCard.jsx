import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../graphql/tasks";
import { AiOutlineDelete } from 'react-icons/ai'

const TaskCard = ({ task }) => {

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: ['getProject']
  });

  return (
    <div className="bg-zinc-900 rounded-xl px-5 py-3 mb-2 flex justify-between">
      <h3>{task.title}</h3>
      <button
        className="bg-red-500 px-4 py-2 rounded-lg text-lg text-white disabled:bg-zinc-400"
        onClick={ () => {
          deleteTask({
            variables: {
              id: task._id
            }
          })}}>
        <AiOutlineDelete />
      </button>
    </div>
  )
}

export default TaskCard;