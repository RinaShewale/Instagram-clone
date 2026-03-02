import { createContext } from "react";
import { useFollow } from "../Posts/hook/usefollow"; // your custom hook

export const followcontext = createContext();

export const FollowContextProvider = ({ children }) => {
  // Use your custom hook to get state + actions
  const {
    followers,
    following,
    loading,
    error,
    handlefollow,
    handleunfollow,
    fetchConnection
  } = useFollow();

  return (
    <followcontext.Provider value={{
      followers,
      following,
      loading,
      error,
      handlefollow,
      handleunfollow,
      fetchConnection
    }}>
      {children}
    </followcontext.Provider>
  );
};


