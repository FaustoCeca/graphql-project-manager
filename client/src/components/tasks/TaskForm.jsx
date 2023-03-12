import { useMutation } from "@apollo/client";
import { CREATE_TASKS } from "../../graphql/tasks";
import { useParams } from 'react-router-dom';

const TaskForm = () => {
   
  const [createTask, { loading, error }] = useMutation(CREATE_TASKS, {
    refetchQueries: ['getProject']
  });
  
  const { id } = useParams();

   const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({
      variables: {
        title: e.target.title.value,
        projectId: id
      }
    })

    e.target.reset();
    e.target.title.focus();
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="bg-zinc-800 p-2 block w-full mb-2 text-white rounded-lg"
        type="text" name="title" placeholder="Add a Task" />
      <button
        className="bg-blue-500 px-4 py-2 rounded-lg w-full text-lg mb-3 text-white disabled:bg-zinc-400"
      >Add</button>
    </form>
  )
}

export default TaskForm; 