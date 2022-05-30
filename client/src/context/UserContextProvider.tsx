import type { User } from "@server/shared/client.types";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../Helper";

interface UserContextValue {
  currentUser: User | undefined;
  handleSignUp: (user: User) => Promise<unknown>;
  handleSignIn: (UserSignIn: User) => void;
  handleSignOut: () => void;
}

export const UserContext = createContext<UserContextValue>({
  currentUser: {
    email: "",
    password: "",
  },
  handleSignUp: () => Promise.resolve(),
  handleSignIn: () => {},
  handleSignOut: () => {},
});

const UserProvider: FC = (props) => {
  const navigate = useNavigate();
  // const [error, setError] = useState();
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleSignUp = async (user: User) => {
    try {
      const { firstname, lastname, email, password } = user;
      let newUser: User = { firstname, lastname, email, password };
      await makeRequest("/api/user", "POST", newUser);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      return error;
    }
  };

  const handleSignIn = async (user: User) => {
    const { email, password } = user;
    let signInUser: User = { email, password };
    await makeRequest("/api/user/login", "POST", signInUser);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleSignOut = async () => {
    await makeRequest("/api/user/logout", "DELETE");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const getCurrentUser = async () => {
    const response = await makeRequest("/api/user/login", "GET");
    setCurrentUser(response);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        handleSignUp,
        handleSignIn,
        handleSignOut,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
