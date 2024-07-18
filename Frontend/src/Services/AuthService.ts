import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/UserModel";
import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { CredentialsModel } from "../Models/CredentialsModel";
import { appStore } from "../Redux/Store";
import { authActionCreators } from "../Redux/AuthSlice";

class AuthService {

    // This constructor initializes an instance of the class.  
    public constructor() {
      // Retrieve the token from the session storage.
      const token = sessionStorage.getItem("token");
  
      // Check if a token exists.
      if (token) {
        // Decode the token to extract the logged-in user information.  
        const loggedInUser = jwtDecode<{ user: UserModel }>(token).user;
        
        // Dispatch a Redux action to log in the user with the extracted user information.
        appStore.dispatch(authActionCreators.login(loggedInUser));
      }
    }
    
    // This method handles user registration.
    public async register(user: UserModel): Promise<void> {
  
      // Send a POST request to the registration URL with the user data.
      const response = await axios.post<string>(appConfig.registerUrl, user);
      
      // Extract the token from the response data.
      const token = response.data;
  
      // Decode the token to extract the registered user information.
      const registeredUser = jwtDecode<{ user: UserModel }>(token).user;
  
      // Dispatch a Redux action to register the user with the extracted user information.
      appStore.dispatch(authActionCreators.register(registeredUser));
      
      // Store the token in the session storage.
      sessionStorage.setItem("token", token);
    }
  
    // This method handles user login.
    public async login(credentials: CredentialsModel): Promise<any> {
      
      // Send a POST request to the login URL with the provided credentials.
      const response = await axios.post<string>(appConfig.loginUrl, credentials);
  
      // Extract the token from the response data.
      const token = response.data;
  
      // Decode the token to extract the logged-in user information.
      const loggedInUser = jwtDecode<{ user: UserModel }>(token).user;
  
      // Dispatch a Redux action to log in the user with the extracted user information.
      appStore.dispatch(authActionCreators.login(loggedInUser));
  
      // Store the token in the session storage.
      sessionStorage.setItem("token", token);
  
      return loggedInUser;
    }
    
    // This method handles user logout.
    public logOut(): void {
      // Dispatch a Redux action to log out the user.
      appStore.dispatch(authActionCreators.logout());
      // Remove the token from the session storage.
      sessionStorage.removeItem("token");
    }
  }
  
  export const authService = new AuthService();