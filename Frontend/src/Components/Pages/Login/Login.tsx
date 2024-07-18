import { useState } from "react";
import "./Login.css";
import { LoginForm } from "../../Forms/LoginForm/LoginForm";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";
import { FormProvider, useFormContext } from "react-hook-form";

export function Login(): JSX.Element {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);
  const methods = useFormContext<CredentialsModel>();
  const navigate = useNavigate();

  const login = async (credentials: CredentialsModel): Promise<void> => {
    try {
      await authService.login(credentials);
      notify.success("Success to login");
      navigate("/products");
    } catch (err: any) {
      notify.error(err);
    }
  };
  return (
    <div className="h-80">
      <FormProvider {...methods}>
        <LoginForm
          onSubmit={login}
          passwordShown={passwordShown}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </FormProvider>
    </div>
  );
}
