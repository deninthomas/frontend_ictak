const BASE_URL = "http://localhost:5000/api";

export const loginMentor = async (email, password) => {
  const res = await fetch(`${BASE_URL}/mentor/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.json());
  return res.json();
};

export const getProjects = async (token) => {
  const res = await fetch(`${BASE_URL}/mentor/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.json());
  return res.json();
};

export const createProject = async (token, data) => {
  const res = await fetch(`${BASE_URL}/mentor/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.json());
  return res.json();
};

export const updateProject = async (token, projectId, data) => {
  const res = await fetch(`${BASE_URL}/mentor/projects/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.json());
  return res.json();
};

export const deleteProject = async (token, projectId) => {
  const res = await fetch(`${BASE_URL}/mentor/projects/${projectId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.json());
  return res.json();
};
