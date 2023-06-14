import { Models } from "appwrite";

export type UserValues = Models.User<UserPreferences>;

export type RegisterUserValues = {
  username: string;
  email: string;
  password: string;
}

export type LoginUserValues = {
  email: string;
  password: string;
}

export type UserPreferences = {
  emailNotification: boolean;
}