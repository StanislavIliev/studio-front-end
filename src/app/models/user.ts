export interface User {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  phoneNumber?: string;
  uniqueString?: string;
  cart?: object;
 expirationDate?: Date;
  expireDate?: Date;
  userToken?: string;

}
