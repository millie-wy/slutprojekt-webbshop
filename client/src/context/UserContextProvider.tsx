import type { User } from "@server/shared/client.types";
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../Helper";
import { useError } from "./ErrorContextProvider";

interface UserContextValue {
  currentUser: User | undefined;
  handleSignUp: (user: User) => Promise<unknown>;
  handleSignIn: (user: User) => Promise<unknown>;
  handleSignOut: () => Promise<unknown>;
}

export const UserContext = createContext<UserContextValue>({
  currentUser: {
    email: "",
    password: "",
  },
  handleSignUp: () => Promise.resolve(),
  handleSignIn: () => Promise.resolve(),
  handleSignOut: () => Promise.resolve(),
});

const UserProvider: FC = (props) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const { setError } = useError();

  // sign up an user account
  const handleSignUp = useCallback(
    async (user: User) => {
      const { firstname, lastname, email, password } = user;
      let newUser: User = { firstname, lastname, email, password };
      let response = await makeRequest("/api/user", "POST", newUser);
      !response.ok ? setError(response.result) : navigate("/");
    },
    [navigate, setError]
  );

  // sign in user account
  const handleSignIn = useCallback(
    async (user: User) => {
      const { email, password } = user;
      let signInUser: User = { email, password };
      let response = await makeRequest("/api/user/login", "POST", signInUser);
      !response.ok ? setError(response.result) : navigate("/");
    },
    [navigate, setError]
  );

  // sign out from an user account
  const handleSignOut = useCallback(async () => {
    const response = await makeRequest("/api/user/logout", "DELETE");
    if (!response.ok) setError(response.result);
    navigate("/");
  }, [navigate, setError]);

  useEffect(() => {
    // get cookie session of current user
    const getCurrentUser = async () => {
      const response = await makeRequest("/api/user/login", "GET");
      response.ok ? setCurrentUser(response.result) : setCurrentUser(undefined);
    };
    getCurrentUser();
  }, [handleSignIn, handleSignOut, currentUser]);

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
