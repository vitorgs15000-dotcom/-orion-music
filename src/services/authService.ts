export type AuthUser = {
  id: string;
  name: string;
  plan: "free" | "premium";
};

export async function getCurrentUser(): Promise<AuthUser> {
  return {
    id: "local-user",
    name: "Vitor",
    plan: "premium"
  };
}
