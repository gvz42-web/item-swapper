export default interface IUser {
  _id?: string;
  nickname: string;
  hashPassword: string;
  items: string[];
  token?: string;
  createdAt?: Date;
}
