import React from "react";
import styled from "styled-components";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import PageTitle from "../components/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";

interface IForm {
  username: string;
  password: string;
  result: string;
}

interface LoginProp {
  ok: string;
  error: string;
  token: string;
}

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm<IForm>({
    mode: "onChange",
  });

  const onCompleted = (data: any) => {
    //무슨타입..?
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });
  const onSubmitValid: SubmitHandler<IForm> = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Log in"></PageTitle>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            onFocus={clearLoginError}
            type="text"
            placeholder="Username"
            hasError={Boolean(formState.errors?.username?.message)}
          />
          <FormError message={formState.errors?.username?.message} />
          <Input
            {...register("password", { required: "Password is required" })}
            onFocus={clearLoginError}
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have a account"
        linkText="Sign Up"
        link={routes.signUp}
      ></BottomBox>
    </AuthLayout>
  );
};

export default Login;
