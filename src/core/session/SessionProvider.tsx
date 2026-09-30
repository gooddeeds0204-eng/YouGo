import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import {
  authService,
  type AuthUser,
} from "@/features/auth/services/authService";

type SessionContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
  refreshUser: () => Promise<AuthUser | null>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    void authService.getCurrentUser().then((currentUser) => {
      if (!mounted) return;
      setUser(currentUser);
      setIsLoading(false);
    });

    const unsubscribe = authService.onAuthStateChange((nextUser) => {
      if (!mounted) return;
      setUser(nextUser);
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      user,
      isLoading,
      setUser,
      refreshUser: async () => {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        return currentUser;
      },
      signOut: async () => {
        await authService.signOut();
        setUser(null);
      },
    }),
    [isLoading, user],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error("useSession must be used inside SessionProvider");
  }
  return value;
}
