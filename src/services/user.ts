import userModel from '../models/user';

export default class userService {
  static async createUser(
    accountType: string,
    name: string,
    email: string,
    password: string
  ) {
    try {
      const user = await userModel.create({
        accountType: accountType,
        name: name,
        email: email,
        password: password,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async userByEmail(email: string) {
    try {
      const user = await userModel.findOne({ email: email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async userById(userId: string) {
    try {
      const user = await userModel.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
