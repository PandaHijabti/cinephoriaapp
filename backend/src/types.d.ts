export type Role = "USER" | "EMPLOYEE" | "ADMIN";
export interface JwtPayload {
  sub: string;
  role: Role;
}
