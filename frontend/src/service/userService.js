import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import log from '../utils/logger';
import { API_BASE_URL } from "./apiClient";


class UserService {
  static async login(username, password) {
    try {
      const loginData = {
        username: username,
        password: password,
      };

      const response = await axios.post(
        `${API_BASE_URL}/login/`,
        loginData,
        { headers: { "Content-Type": "application/json" } }
      );

      const { access, refresh } = response.data;

      const decodedToken = jwtDecode(access);
      const userId = decodedToken.user_id;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("userName", username);
      localStorage.setItem("userId", userId);

      UserService.setRefreshTimer(access);

      return { success: true };
    } catch (error) {
      console.error("Login failed!", error);
      toast.error("Login failed! Please ensure that your username and password are correct.");
      return { success: false, error: error.response?.data?.message || "Login failed" };
    }
  }

  static logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
  }

  static isLoggedIn() {
    const tokenExpired = UserService.isTokenExpired();
    if (tokenExpired) {
        UserService.logout();
    }
    const accessToken = localStorage.getItem("accessToken");
    return accessToken ? true : false;
  }

  static getUsername() {
    return localStorage.getItem("userName");
  }

  static getUserId() {
    return localStorage.getItem("userId");
  }

  static getTokenExpiration(token) {
    const decodedToken = jwtDecode(token);
    log.debug("Decoded token:", decodedToken);
    return decodedToken.exp * 1000;
  }

  static setRefreshTimer(accessToken) {
    const expirationTime = UserService.getTokenExpiration(accessToken);
    const currentTime = new Date().getTime();
    const timeToRefresh = expirationTime - currentTime - 60 * 1000;

    if (timeToRefresh > 0) {
      setTimeout(() => {
        UserService.refreshAccessToken();
      }, timeToRefresh);
    } else {
      UserService.refreshAccessToken();
    }
  }

  static async refreshAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.error("No refresh token found");
      toast.error("Session expired. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/refresh/`,
        { refresh: refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const { access } = response.data;
      localStorage.setItem("accessToken", access);
      UserService.setRefreshTimer(access);
      toast.success("Access token refreshed!");
    } catch (error) {
      console.error("Failed to refresh token", error);
      toast.error("Failed to refresh token. Please log in again.");
      UserService.logout();
    }
  }

  static isTokenExpired() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return true;
    }

    const expirationTime = UserService.getTokenExpiration(accessToken);
    const currentTime = new Date().getTime();
    return expirationTime < currentTime;
  }
}

export default UserService;
