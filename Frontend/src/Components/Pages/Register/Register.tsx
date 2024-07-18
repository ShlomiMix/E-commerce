import { FormProvider, useFormContext } from "react-hook-form";
import { RegisterForm } from "../../Forms/RegisterForm/RegisterForm";
import "./Register.css";
import { UserModel } from "../../../Models/UserModel";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Register(): JSX.Element {
  const methods = useFormContext<UserModel>();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);
  const navigate = useNavigate();

  const addUser = async (user: UserModel): Promise<void> => {
    try {
      user.roleId = 2  
      await authService.register(user);
      notify.success("user has been added");
      navigate("/products");
    } catch (err: any) {
      notify.error(err);
    }
  };

  return (
    <div className="Register">
      <FormProvider {...methods}>
        <RegisterForm
          onSubmit={addUser}
          passwordShown={passwordShown}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </FormProvider>
    </div>
  );
}
