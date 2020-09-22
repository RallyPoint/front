export class AuthentificationModel {
  user: {
    pseudo: string,
    email: string,
    id: string,
    sso: string,
    roles: string[],
    color: string
  };
  accessToken: string;
  refreshToken: string;
}
