export interface LoginResponse {
  employee: {
    id: number;
    fname: string;
    lname: string;
    role: string;
    uname: string;
  };
  token: string;
}
