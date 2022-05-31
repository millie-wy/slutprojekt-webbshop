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

interface UserContextValue {
  currentUser: User | undefined;
  handleSignUp: (user: User) => Promise<unknown>;
  handleSignIn: (user: User) => Promise<unknown>;
  handleSignOut: () => Promise<unknown>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextValue>({
  currentUser: {
    email: "",
    password: "",
  },
  handleSignUp: () => Promise.resolve(),
  handleSignIn: () => Promise.resolve(),
  handleSignOut: () => Promise.resolve(),
  error: "",
  setError: () => "",
});

const UserProvider: FC = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const handleSignUp = useCallback(
    async (user: User) => {
      const { firstname, lastname, email, password } = user;
      let newUser: User = { firstname, lastname, email, password };
      let response = await makeRequest("/api/user", "POST", newUser);
      !response.ok ? setError(response.result) : navigate("/");
    },
    [navigate]
  );

  const handleSignIn = useCallback(
    async (user: User) => {
      const { email, password } = user;
      let signInUser: User = { email, password };
      let response = await makeRequest("/api/user/login", "POST", signInUser);
      !response.ok ? setError(response.result) : navigate("/");
    },
    [navigate]
  );

  const handleSignOut = useCallback(async () => {
    // this one has error
    const response = await makeRequest("/api/user/logout", "DELETE");
    if (!response.ok) setError(response.result);
    setCurrentUser(undefined);
    navigate("/");
    window.location.reload();
    console.log("function end");
  }, [navigate]);

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await makeRequest("/api/user/login", "GET");
      response.ok ? setCurrentUser(response.result) : setCurrentUser(undefined);
    };
    getCurrentUser();
  }, [handleSignIn, handleSignOut]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        handleSignUp,
        handleSignIn,
        handleSignOut,
        error,
        setError,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
