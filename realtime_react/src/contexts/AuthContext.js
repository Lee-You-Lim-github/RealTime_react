import useLocalStorage from "hook/useLocalStorage";
import { createContext, useCallback, useContext } from "react";

const INITIAL_AUTH = { isLoggedIn: false };

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useLocalStorage("auth", INITIAL_AUTH);

  const login = useCallback(
    ({ access, refresh, id, user_id, nickname, authority }) => {
      setAuth({
        isLoggedIn: true,
        access,
        refresh,
        id,
        user_id,
        nickname,
        authority,
      });
    },
    [setAuth]
  );

  const logout = useCallback(() => {
    setAuth({
      isLoggedIn: false,
    });
  }, [setAuth]);

  return (
    <AuthContext.Provider value={[auth, setAuth, login, logout]}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
