import { account } from "../auth/appwrite";
import { ID } from "appwrite";
import { LoginUserValues, RegisterUserValues, UserPreferences } from "../types/User.type";

// Retrieves the current user's preferences
async function getCurrentUser() {
  const promise = account.get<UserPreferences>();
  return await promise;
}

// Updates the email notification preference for the current user
async function updateEmailNotification(checked: boolean) {
  const promise = account.updatePrefs({ emailNotification: checked });
  return await promise;
}

// Creates a new user
async function createUser(userProps: RegisterUserValues) {
  const promise = account.create(
    ID.unique(),
    userProps.email,
    userProps.password,
    userProps.username
  );
  return await promise;
}

// Logs in a user
async function loginUser(userProps: LoginUserValues) {
  const promise = account.createEmailSession(userProps.email, userProps.password);
  return await promise;
}

// Logs out the current user
async function logoutUser() {
  const promise = account.deleteSession("current");
  return await promise;
}

// Initiates the email verification process
async function startEmailVerification() {
  const url = `${window.location.origin}/verifySuccess`;
  const promise = account.createVerification(url);
  return await promise;
}

// Completes the email verification process
async function completeEmailVerification(userId: string, secret: string) {
  await account.updateVerification(userId, secret);
}

// Changes the user's password
async function changePassword(password: string, oldPassword: string) {
  await account.updatePassword(password, oldPassword);
}

// Initiates the password recovery process
async function forgotPassword(email: string) {
  const url = `${window.location.origin}/resetPassword`;
  await account.createRecovery(email, url);
}

// Completes the password recovery process
async function completePasswordRecovery(
  userId: string,
  secret: string,
  pass: string,
  confirmPass: string
) {
  await account.updateRecovery(userId, secret, pass, confirmPass);
}

// Object containing user service functions
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
