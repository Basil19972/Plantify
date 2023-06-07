import {account} from "../auth/appwrite";
import { ID } from "appwrite";
import { LoginUserValues, RegisterUserValues, UserPreferences, UserValues } from "../types/User.type";


    async function getCurrentUser() {
    const promise = account.get<UserPreferences>();
    return await promise;
  }

    async function updateEmailNotification(checked: boolean) {
    const promise = account.updatePrefs({emailNotification: checked});
    }


  async function createUser(userProps: RegisterUserValues) {
   const promise = account.create(ID.unique(),userProps.email,userProps.password, userProps.username);
    return await promise;
  }
  

  async function loginUser(userProps: LoginUserValues) {
  const promise = account.createEmailSession(userProps.email, userProps.password);
  return await promise;
  }

  async function logoutUser() {
  const promise = account.deleteSession( 'current' );  
  return await promise;
  }

  async function startEmailVerification() {
const url = `${window.location.origin}/verifySuccess`
  const promise = account.createVerification( url );  
  return await promise;
  }

  async function completeEmailVerification(userId: string, secret: string) {
    await account.updateVerification(userId, secret);
  }
  async function changePassword(password: string, oldPassword: string) {
    await account.updatePassword(password, oldPassword);
  }

    async function forgotPassword(email: string) {
    const url = `${window.location.origin}/resetPassword`
    await account.createRecovery(email, url);
  }

      async function completePasswordRecovery(userId :string, secret: string, pass: string, confirmPass:string) {
    await account.updateRecovery(userId, secret, pass, confirmPass);
  }




const userService = {
  getCurrentUser,
  updateEmailNotification,
  createUser,
  loginUser,
  logoutUser,
  startEmailVerification,
  completeEmailVerification,
  changePassword,
  forgotPassword,
  completePasswordRecovery
  
};

export default userService;