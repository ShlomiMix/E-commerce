import { cyber } from "../2-utils/cyber";
import { ValidationError } from "../3-models/client-errors";
import { ICredentialsModel } from "../3-models/credentials-model";
import { RoleModel } from "../3-models/role-model";
import { IUserModel, UserModel } from "../3-models/user-model";

class AuthService {
  public async register(user: IUserModel): Promise<string> {
    const errors = user.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }
    const isEmailTaken = await this.isEmailTaken(user.email);
    if (isEmailTaken) {
      throw new ValidationError(
        "The email is taken choose a different email please"
      );
    }

    user.roleId = RoleModel.User;
    user.password = cyber.hashPassword(user.password);

    await user.save();

    const token = cyber.getNewToken(user);

    return token;
  }

  public async login(credentials: ICredentialsModel): Promise<string> {
    const errors = credentials.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }

    credentials.password = cyber.hashPassword(credentials.password);

    const users = await UserModel.find({
      email: { $eq: credentials.email },
      password: { $eq: credentials.password },
    });

    const user = users[0];

    if (!user) {
      throw new ValidationError("Incorrect Email or Password");
    }

    const token = cyber.getNewToken(user);

    return token;
  }

  public async isEmailTaken(email: string): Promise<boolean> {
    const allEmails = await UserModel.find({ email: { $eq: email } });
    return allEmails.length > 0;
  }
}

export const authService = new AuthService();
