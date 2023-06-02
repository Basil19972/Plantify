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




const userService = {
  getCurrentUser,
  updateEmailNotification,
  createUser,
  loginUser,
  logoutUser
};

export default userService;