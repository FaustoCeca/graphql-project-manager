import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_PROJECT, GET_PROJECT } from "../graphql/projects";
import { TaskForm, TaskList } from "../components/tasks";


const ProjectDetails = () => {
  
  const { id: projectId } = useParams();
  
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: ['getProject']
  });

  const handleDeleteProject = () => {
    deleteProject({
      variables: {
        id: projectId
      }
    })

    window.location.href = '/projects';
  }

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: {
      id: projectId
    },
    skip: !projectId
  });
  
  if (loading) return <p>Loading...</p>;
  
  if (error) return <p>Error :(
    {error.message}
  )</p>;

  return (
    <div className="m-0 w-full lg:w-[500px]">
      <Link to={'/projects'}>
        <button className="mb-3 bg-blue-500 px-4 py-2 rounded-lg text-lg text-white">Back</button>
      </Link>
      <div className="bg-zinc-900 mb-2 flex flex-col rounded-xl p-8">
        <h2 className="text-2xl capitalize">{data.project.name}</h2>
        <p>{ data.project.description }</p>
      </div>
      <button
        onClick={ 
          () => {
            handleDeleteProject();
          }
        }
        className="bg-red-500 w-full px-4 py-2 rounded-lg text-lg text-white mb-3 mt-1"
      >
        Delete Project
      </button>
      <TaskForm />
      <TaskList tasks={data.project.tasks} />
    </div>
  ) 
}

export default ProjectDetails;