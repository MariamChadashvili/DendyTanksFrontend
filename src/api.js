import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api', 
});

export const register = (email, name, password, password2) =>
  API.post('/register/', { email, name, password, password2 });


  export const login = async (email, password) => {
    const response = await API.post('/token/', { email, password });
    const { access, refresh } = response.data;
  
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  
    return response.data;
  };

export const refresh = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await API.post('/token/refresh/', { refresh: refreshToken });
    const { access } = response.data;
  
    localStorage.setItem('accessToken', access);
  
    return response.data;
};

export const createRoom = async (roomName, capacity) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await API.post(
      '/room/',
      { name: roomName, capacity },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
};

export const deleteRoom = async (roomId) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await API.delete(`/room/${roomId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
};

export const updateRoom = async (roomId, roomName, capacity) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await API.patch(
      `/room/${roomId}/`,
      { name: roomName, capacity },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
};

export const fetchRooms = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await API.get('/room/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
};

export const fetchRoom = async (roomId) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await API.get(`/room/${roomId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
};
  
  

export default API;


