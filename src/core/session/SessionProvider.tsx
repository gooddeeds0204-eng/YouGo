import AsyncStorage from "@react-native-async-storage/async-storage";
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

const PREVIEW_SESSION_KEY = "ugo.preview.session";

const previewUser: AuthUser = {
  id: "preview-user",
  displayName: "Ugo Tester",
  avatarUrl: null,
  profileComplete: true,
  phone: null,
};

type SessionContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
  refreshUser: () => Promise<AuthUser | null>;
  enterPreviewMode: () => Promise<void>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

async function readPreviewSession() {
  const value = await AsyncStorage.getItem(PREVIEW_SESSION_KEY);
  return value === "1" ? previewUser : null;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    void (async () => {
      const currentUser = await authService.getCurrentUser();
      const preview = currentUser ? null : await readPreviewSession();

      if (!mounted) return;
      setUser(currentUser ?? preview);
      setIsLoading(false);
    })();

    const unsubscribe = authService.onAuthStateChange((nextUser) => {
      if (!mounted) return;

      if (nextUser) {
        setUser(nextUser);
        setIsLoading(false);
        return;
      }

      void readPreviewSession().then((preview) => {
        if (!mounted) return;
        setUser(preview);
        setIsLoading(false);
      });
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
        const preview = currentUser ? null : await readPreviewSession();
        const next = currentUser ?? preview;
        setUser(next);
        return next;
      },
      enterPreviewMode: async () => {
        await AsyncStorage.setItem(PREVIEW_SESSION_KEY, "1");
        setUser(previewUser);
      },
      signOut: async () => {
        await AsyncStorage.removeItem(PREVIEW_SESSION_KEY);
        await authService.signOut().catch(() => undefined);
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
