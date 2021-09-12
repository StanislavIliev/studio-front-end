export class User {
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
  private expirationDate: Date;

  constructor(){
      this.username = '',
      this.email = '';
      this.password = '',
      this.email = '',
      this.firstName = '',
      this.token = '',
      this.lastName = '',
      this.phoneNumber = '',
      this.uniqueString = '',
      this.cart = null;
      this.expirationDate = null;
    }


    get expireDate() {
      return this.expirationDate;
    }
  
    get userToken() {
      return this.token;
    }
}
