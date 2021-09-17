/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: unollowUser
// ====================================================

export interface unollowUser_unfollowUser {
  __typename: "MutationResponse";
  ok: boolean;
}

export interface unollowUser {
  unfollowUser: unollowUser_unfollowUser | null;
}

export interface unollowUserVariables {
  username: string;
}
