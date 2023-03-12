import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../graphql/projects';
import ProjectCard from './ProjectCard';


const ProjectList = () => {

    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(
        {error.message}
    )
    </p>;

  return (
    <div className='overflow-y-auto h-36 w-full px-5 lg:h-80'>
        {
            data.projects.map((project) => (
                <ProjectCard
                    key={project._id}
                    project={project}
                />
            ))
        }
    </div>
  )
}

export default ProjectList;