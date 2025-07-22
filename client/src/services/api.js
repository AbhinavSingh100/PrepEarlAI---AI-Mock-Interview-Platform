// services/api.js
import axios from 'axios';


const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, // or your deployed backend
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchQuestions = async ( { role, experience, stack } ) => {
    console.log(role, experience, stack);
    const res = await API.post('/session/start', { role, experience, stack });
    return res;
}

export const sendAnswer = async ( sessionId, questionIndex, answer ) => {
    const res = await API.post('/session/answer', { sessionId, questionIndex, answer }); 
    return res;
}

export const getFeedback = async ( sessionId ) => {
    const res = await API.post('/session/end', { sessionId }); 
    return res.data.feedback;
}
export default API;
