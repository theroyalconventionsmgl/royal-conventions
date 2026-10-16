import {
  multiFactor,
  TotpMultiFactorGenerator,
  getMultiFactorResolver,
  type MultiFactorResolver,
  type TotpSecret,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export interface MfaEnrollmentStart {
  secret: TotpSecret;
  /** Manual-entry key for authenticator apps (never logged or stored). */
  secretKey: string;
  /** otpauth:// URL (copy-paste into authenticator apps that support it). */
  keyUri: string;
}

export function enrolledTotpFactors(user: User): string[] {
  return multiFactor(user)
    .enrolledFactors.filter((f) => f.factorId === TotpMultiFactorGenerator.FACTOR_ID)
    .map((f) => f.uid);
}

export async function startTotpEnrollment(
  user: User,
  accountLabel: string
): Promise<MfaEnrollmentStart> {
  const session = await multiFactor(user).getSession();
  const secret = await TotpMultiFactorGenerator.generateSecret(session);
  return {
    secret,
    secretKey: secret.secretKey,
    keyUri: secret.generateQrCodeUrl(user.email ?? accountLabel, "The Royal Conventions"),
  };
}

export async function finalizeTotpEnrollment(
  user: User,
  start: MfaEnrollmentStart,
  code: string,
  displayName = "Authenticator app"
): Promise<void> {
  const assertion = TotpMultiFactorGenerator.assertionForEnrollment(start.secret, code.trim());
  await multiFactor(user).enroll(assertion, displayName);
  await user.reload();
}

export async function unenrollTotpFactor(user: User, factorUid: string): Promise<void> {
  const factor = multiFactor(user).enrolledFactors.find((f) => f.uid === factorUid);
  if (!factor) throw new Error("That authenticator is not enrolled on this account.");
  await multiFactor(user).unenroll(factor);
  await user.reload();
}

export interface MfaChallenge {
  resolver: MultiFactorResolver;
  hintUid: string;
}

/** Extracts the TOTP challenge from a failed password sign-in, if MFA is required. */
export function toMfaChallenge(err: unknown): MfaChallenge | null {
  const code = (err as { code?: string }).code ?? "";
  if (code !== "auth/multi-factor-auth-required") return null;
  try {
    const resolver = getMultiFactorResolver(auth, err as Parameters<typeof getMultiFactorResolver>[1]);
    const hint = resolver.hints.find(
      (h) => h.factorId === TotpMultiFactorGenerator.FACTOR_ID
    );
    if (!hint) return null;
    return { resolver, hintUid: hint.uid };
  } catch {
    return null;
  }
}

export async function resolveTotpChallenge(challenge: MfaChallenge, code: string): Promise<void> {
  const assertion = TotpMultiFactorGenerator.assertionForSignIn(challenge.hintUid, code.trim());
  await challenge.resolver.resolveSignIn(assertion);
}
