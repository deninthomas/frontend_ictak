import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { getProjects, deleteProject } from "../utils/api";
import ProjectForm from "./ProjectForm";

const MentorDashboard = () => {
  const [projects, setProjects] = useState([]);
  const { auth, logout } = useContext(AuthContext);

  const fetchProjects = async () => {
    try {
      const data = await getProjects(auth.token);
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await deleteProject(auth.token, projectId);
      setProjects(projects.filter((p) => p._id !== projectId));
    } catch (err) {
      console.error("Failed to delete project", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="dashboard">
      <button onClick={logout}>Logout</button>
      <h2>Mentor Dashboard</h2>
      <ProjectForm refreshProjects={fetchProjects} />
      <div>
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorDashboard;
