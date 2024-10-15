import axios from "axios";

const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9hbyIsImVtYWlsIjoiam9hb0BnbWFpbC5jb20iLCJpYXQiOjE3MjgzMDg0NjgsImV4cCI6MTcyODkxMzI2OCwic3ViIjoiNDhkNTFkYTUtNzFjNy00YjY3LWJlYmEtZjBiZmY1ZDZlNDIyIn0.nTM41kbn25FNPHyyo2yM7R2To107Co3K8RRgb_81f0k'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  validateStatus: (status) => status >= 200 && status <= 299,
  headers: {
    Authorization: `Bearer ${mockToken}`
  }
});

export default api;