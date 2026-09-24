export type SendOtpResult = {
  challengeId: string;
};

export type VerifyOtpResult = {
  userId: string;
  isNewUser: boolean;
};

export interface AuthService {
  sendOtp(phone: string): Promise<SendOtpResult>;
  verifyOtp(challengeId: string, code: string): Promise<VerifyOtpResult>;
}

export const demoAuthService: AuthService = {
  async sendOtp(phone) {
    return { challengeId: "demo:" + phone };
  },
  async verifyOtp(challengeId, code) {
    if (!challengeId.startsWith("demo:") || code.length !== 6) {
      throw new Error("Invalid demo OTP");
    }
    return { userId: "demo-user", isNewUser: true };
  },
};
