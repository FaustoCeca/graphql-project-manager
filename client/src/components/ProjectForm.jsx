import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT, GET_PROJECTS } from '../graphql/projects';

const ProjectForm = () => {
  const [project, setProject] = useState({
    name: '',
    description: ''
  });

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTS
      },
      'GetProjects',
    ]
  }); 

  const handleInputChange = ({ target }) => {
    setProject({
      ...project,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProject({
      variables: {
        name: project.name,
        description: project.description
      }
    });
  }

  return (
    <form className='w-full lg:w-2/5' onSubmit={handleSubmit}>
      
      {error && <p>{error.message}</p>}

      <input
        className='bg-zinc-800 shadow-lg p-4 block w-full mb-3 text-white rounded-lg'
        onChange={handleInputChange} type="text" name="name" placeholder="Write a title" />
      
      <textarea 
        className='bg-zinc-800 shadow-lg p-4 block w-full mb-3 text-white rounded-lg'
        name="description" 
        rows="3" 
        onChange={handleInputChange}
        placeholder="Write a description" 
      ></textarea>
    
      <button
        className='bg-blue-500 px-4 py-2 rounded-lg text-lg mb-3 text-white disabled:bg-zinc-400 w-full lg:w-1/2'
        disabled={!project.name || !project.description || loading}>
        Save
      </button>
    </form>
  )
}

export default ProjectForm;