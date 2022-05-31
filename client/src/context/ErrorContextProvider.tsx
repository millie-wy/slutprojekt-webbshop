import { createContext, FC, useContext, useState } from "react";

interface ErrorContextValue {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const ErrorContext = createContext<ErrorContextValue>({
  error: "",
  setError: () => "",
});

const ErrorProvider: FC = (props) => {
  const [error, setError] = useState<string>("");

  return (
    <ErrorContext.Provider
      value={{
        error,
        setError,
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
export const useError = () => useContext(ErrorContext);
