import axios from "axios";

const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9hbyIsImVtYWlsIjoiam9hb0BnbWFpbC5jb20iLCJpYXQiOjE3MjgxMzc5MTgsImV4cCI6MTcyODc0MjcxOCwic3ViIjoiNDhkNTFkYTUtNzFjNy00YjY3LWJlYmEtZjBiZmY1ZDZlNDIyIn0.X5BTpCphYpJPVLQ8qLTGrx5cZ-OI11Nitqxw7__CDj4'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  validateStatus: (status) => status >= 200 && status <= 299,
  headers: {
    Authorization: `Bearer ${mockToken}`
  }
});

export default api;