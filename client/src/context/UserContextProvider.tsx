import { createContext, FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../Helper";
import { User } from "../Types";

interface UserContextValue {
  handleSignUp: (user: User) => void;
}

export const UserContext = createContext<UserContextValue>({
  handleSignUp: () => {},
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

  return (
    <UserContext.Provider
      value={{
        handleSignUp,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
