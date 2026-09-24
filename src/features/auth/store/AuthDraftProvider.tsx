import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import {
  emptyProfileDraft,
  type UserProfileDraft,
} from "@/domains/users/profile";

type AuthDraftContextValue = {
  draft: UserProfileDraft;
  updateDraft: (patch: Partial<UserProfileDraft>) => void;
  resetDraft: () => void;
};

const AuthDraftContext = createContext<AuthDraftContextValue | null>(null);

export function AuthDraftProvider({ children }: PropsWithChildren) {
  const [draft, setDraft] = useState<UserProfileDraft>(emptyProfileDraft);

  const value = useMemo<AuthDraftContextValue>(
    () => ({
      draft,
      updateDraft: (patch) =>
        setDraft((current) => ({ ...current, ...patch })),
      resetDraft: () => setDraft(emptyProfileDraft),
    }),
    [draft],
  );

  return (
    <AuthDraftContext.Provider value={value}>
      {children}
    </AuthDraftContext.Provider>
  );
}

export function useAuthDraft() {
  const value = useContext(AuthDraftContext);
  if (!value) {
    throw new Error("useAuthDraft must be used inside AuthDraftProvider");
  }
  return value;
}
