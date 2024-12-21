import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { createProject } from "../utils/api";

const ProjectForm = ({ refreshProjects }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { auth } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(auth.token, { title, description });
      setTitle("");
      setDescription("");
      refreshProjects();
    } catch (err) {
      console.error("Failed to create project", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Project</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button type="submit">Add Project</button>
    </form>
  );
};

export default ProjectForm;
