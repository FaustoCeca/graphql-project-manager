import { ProjectForm, ProjectList } from "../components";

const Projects = () => {
  return (
    <div className="bg-zinc-900 rounded-md shadow-lg shadow-black p-5 h-3/5 w-3/5 lg:p-8">
        <h1 className="font-bold text-2x1 py-2 mb-4">Project Manager</h1>
        <div className="flex justify-center gap-1 flex-col lg:flex-row">
          <ProjectForm />
          <ProjectList />
        </div>
    </div>
  )
}

export default Projects;