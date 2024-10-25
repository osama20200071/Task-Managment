import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite/config";
import { ID } from "appwrite";

const authContext = createContext({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
  handleRegister: () => {},
});

export const useAuth = () => useContext(authContext);

const AuthContext = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    getCurrentLoggedInUser();
  }, []);

  const getCurrentLoggedInUser = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      console.log("no user logged in..");
    }
  };

  const handleLogin = async (credentials) => {
    console.log("Logging in...", credentials);

    try {
      const response = await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );

      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      console.log("failed to login");
      return error.message;
    }
  };

  const handleLogout = async () => {
    const response = await account.deleteSession("current");
    console.log(response);
    setUser(null);
  };

  const handleRegister = async (credentials, onRest) => {
    try {
      let response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password,
        credentials.name
      );
      console.log("User registered!", response);
      onRest();

      await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );
      let currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
    }
  };

  let ctx = { user, handleLogin, handleLogout, handleRegister };

  return <authContext.Provider value={ctx}>{children}</authContext.Provider>;
};

export default AuthContext;
