import { createContext, FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../Helper";
import { User, UserSignIn } from "../Types";

interface UserContextValue {
  handleSignUp: (user: User) => void;
  // handleSignIn: (email, password) => void;
  handleSignIn: (UserSignIn: UserSignIn) => void;
}

export const UserContext = createContext<UserContextValue>({
  handleSignUp: () => {},
  handleSignIn: () => {}
});

const UserProvider: FC = (props) => {
  const navigate = useNavigate();

  const handleSignUp = async (user: User) => {
    const { firstname, lastname, email, password } = user;
    let newUser: User = { firstname, lastname, email, password };
    await makeRequest("/api/user", "POST", newUser);
    setTimeout(() => {
      // this navigates the user even if invalid email is entered, adjust if you want
      navigate("/");
    }, 1000);
  };

  const handleSignIn = async (userSignIn: UserSignIn) => {
    const { email, password } = userSignIn; 
    let signIn: UserSignIn = { email, password }
    await makeRequest ("/api/user", "POST", signIn);
    setTimeout(() => {
      navigate("/"); 
    }, 1000);
  };

  /* const handleSignIn = async (email, password) => {
    const user = { email, password };
    await makeRequest("/api/user", "POST", user); 
    setTimeout(() => {
      navigate("/");
    }, 1000);
  } */

  return (
    <UserContext.Provider
      value={{
        handleSignUp,
        handleSignIn
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
