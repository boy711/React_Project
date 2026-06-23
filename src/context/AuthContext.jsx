import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const USER_STORAGE_KEY = "studentspace_user";
const LOGIN_STORAGE_KEY = "studentspace_logged_in";

function getSavedUser() {
  const savedUser = localStorage.getItem(USER_STORAGE_KEY);
  return savedUser ? JSON.parse(savedUser) : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(LOGIN_STORAGE_KEY) === "true"
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
    localStorage.setItem(LOGIN_STORAGE_KEY, String(isLoggedIn));
  }, [user, isLoggedIn]);

  // Fake signup only stores user information in localStorage.
  function signup(userData) {
    const newUser = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    setUser(newUser);
    setIsLoggedIn(true);
    return { success: true };
  }

  // Fake login checks against saved signup data when it exists.
  function login(email, password) {
    const savedUser = getSavedUser();

    if (savedUser && (savedUser.email !== email || savedUser.password !== password)) {
      return { success: false, message: "Email or password is incorrect." };
    }

    const loginUser = savedUser || { name: "Student", email };
    setUser(loginUser);
    setIsLoggedIn(true);
    return { success: true };
  }

  function logout() {
    setIsLoggedIn(false);
    localStorage.setItem(LOGIN_STORAGE_KEY, "false");
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
