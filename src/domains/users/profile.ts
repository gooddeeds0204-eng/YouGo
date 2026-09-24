export type Gender = "female" | "male" | "other" | "prefer-not-to-say";

export type UserProfileDraft = {
  phone: string;
  language: string;
  displayName: string;
  username: string;
  birthDate: string;
  gender: Gender;
  country: string;
  interests: string[];
  avatarUri?: string | null;
};

export const emptyProfileDraft: UserProfileDraft = {
  phone: "",
  language: "en",
  displayName: "",
  username: "",
  birthDate: "",
  gender: "prefer-not-to-say",
  country: "IN",
  interests: [],
  avatarUri: null,
};
