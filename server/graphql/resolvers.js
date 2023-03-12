import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        projects: async () => {
            return await Project.find();
        },
        tasks: async () => {
            return await Task.find();
        },
        project: async (_, { _id }) => {
            return await Project.findById(_id);
        },
        task: async (_, { _id }) => {
            return await Task.findById(_id);
        }
    },
    Mutation: {
        createProject: async (_, { name, description }) => {
            const project = new Project({ name, description });
            const savedProject = await project.save();
            return savedProject;
        },
        createTask: async (_, { title, projectId }) => {

            const foundProject = await Project.findById(projectId);
            
            if (!foundProject) { throw new Error('Project ID does not exist') }

            const task = new Task({ title, projectId });
            const savedTask = await task.save();
            return savedTask;
        },
        deleteProject: async (_, { _id }) => {
            const deletedProject = await Project.findByIdAndDelete(_id);
            if (!deletedProject) { throw new Error('Project ID does not exist') }

            Task.deleteMany({ projectId: deletedProject._id })
                .then(() => console.log('Tasks deleted'))
            return deletedProject;
        },
        deleteTask: async (_, { _id }) => {
            const deletedTask = await Task.findByIdAndDelete(_id);
            if (!deletedTask) { throw new Error('Task ID does not exist') }

            return deletedTask;
        },
        updateProject: async (_, args) => {
            const updatedProject = await Project.findByIdAndUpdate(args._id, args, {
                new: true,
            });
            
            if (!updatedProject) { throw new Error('Project ID does not exist') }

            return await updatedProject.save();
        },
        updateTask: async (_, args) => {
            const updatedTask = await Task.findByIdAndUpdate(args._id, args, {
                new: true,
            });

            if (!updatedTask) { throw new Error('Task ID does not exist') }

            return await updatedTask.save();
        }
    },
    Project: {
        tasks: async (parent) => {
            return await Task.find({ projectId: parent._id });
        }
    },
    Task: {
        project: async (parent) => {
            console.log(parent.projectId);
            return await Project.findById(parent.projectId);
        }
    }
}