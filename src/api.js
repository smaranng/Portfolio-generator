import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000"
});

// Professionals
export const getProfessionals = () => API.get("/professionals");
export const addProfessional = (data) => API.post("/professionals", data);

// Templates
export const getTemplates = () => API.get("/templates");
