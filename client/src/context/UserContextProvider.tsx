import { createContext, FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../Helper";
import { User, UserSignIn, UserSignOut } from "../Types";

interface UserContextValue {
  handleSignUp: (user: User) => void;
  handleSignIn: (UserSignIn: UserSignIn) => void;
  handleSignOut: (userSignOut: UserSignOut) => void;
}

export const UserContext = createContext<UserContextValue>({
  handleSignUp: () => {},
  handleSignIn: () => {},
  handleSignOut: () => {}
});

const UserProvider: FC = (props) => {
  const navigate = useNavigate();

  const handleSignUp = async (user: User) => {
    const { firstname, lastname, email, password } = user;
    let newUser: User = { firstname, lastname, email, password };
    await makeRequest("/api/user", "POST", newUser);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleSignIn = async (user: UserSignIn) => {
    const { email, password } = user; 
    let signInUser: UserSignIn = { email, password }
    await makeRequest ("/api/user/login", "POST", signInUser);
    setTimeout(() => {
      navigate("/"); 
    }, 1000);
  };

  const handleSignOut = async () => {
    await makeRequest ("/api/user/logout", "DELETE"); 
    setTimeout(() => {
      navigate("/");
    }, 1000)
  }



  return (
    <UserContext.Provider
      value={{
        handleSignUp,
        handleSignIn,
        handleSignOut
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
