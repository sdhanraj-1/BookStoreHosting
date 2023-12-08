
// config.ts
export const APP_PORT = Number(import.meta.env.VITE_REACT_APP_APP_PORT) || 3000;
export const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL || `http://54.167.103.63:${APP_PORT}/api`;
export const COOKIE_USER = import.meta.env.VITE_REACT_APP_COOKIE_USER || "userid" 
export const AUTH_BASE_URL = import.meta.env.VITE_REACT_APP_AUTH_BASE_URL || `http://54.167.103.63:${APP_PORT}`;

