/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login {
  __typename: "LoginResult";
  ok: boolean;
  token: string | null;
  error: string | undefined;
}

export interface login {
  login: login_login | null;
}

export interface loginVariables {
  username: string;
  password: string;
}
