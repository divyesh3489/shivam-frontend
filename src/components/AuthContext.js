// AuthContext.js
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [cookies, setCookie] = useCookies(["access", "refresh"]);
  useEffect(() => {
    if (cookies.access && cookies.refresh) {
      axios
        .get("http://localhost:8000/api/user/auth/profile/", {
          headers: {
            Authorization: "JWT " + cookies.access,
          },
        })
        .then((res) => {
          if (res.data.username) {
            setIsLoggedIn(res.data);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
