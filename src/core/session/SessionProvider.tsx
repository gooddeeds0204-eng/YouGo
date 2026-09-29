import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { authService } from "@/features/auth/services/authService";

type SessionUser = {
  id: string;
  displayName: string;
} | null;

type SessionContextValue = {
  user: SessionUser;
  isLoading: boolean;
  setUser: (user: SessionUser) => void;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<SessionUser>(null);
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
