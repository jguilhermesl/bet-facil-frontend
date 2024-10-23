import axios from "axios";

const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9hbyIsImVtYWlsIjoiam9hb0BnbWFpbC5jb20iLCJpYXQiOjE3MjkwMDI3NjIsImV4cCI6MTcyOTYwNzU2Miwic3ViIjoiNDhkNTFkYTUtNzFjNy00YjY3LWJlYmEtZjBiZmY1ZDZlNDIyIn0.jMXowN837lMiPOs-FsXw4g9G1IeKPan-EJ4OSRtazv8'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  validateStatus: (status) => status >= 200 && status <= 299,
  headers: {
    Authorization: `Bearer ${mockToken}`
  }
});

export default api;