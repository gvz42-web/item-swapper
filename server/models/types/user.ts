export default interface IUser {
  _id?: string;
  nickname: string;
  hashPassword: string;
  items: number[];
  token?: string;
  createdAt?: Date;
}
