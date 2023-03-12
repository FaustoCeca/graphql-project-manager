import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  
  const navigate = useNavigate();

  return (
    <div 
      className='bg-zinc-900 rounded-lg shadow-lg shadow-black p-4 mb-2 hover:bg-zinc-700 hover:cursor-pointer'
      onClick={ () => navigate(`/projects/${project._id}`) }
    >
        <h2>{project.name}</h2>
        <p>{project.description}</p>
    </div>
  )
}

export default ProjectCard;