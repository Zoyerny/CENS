export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Auth = {
  __typename?: 'Auth';
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type LogoutReponse = {
  __typename?: 'LogoutReponse';
  loggedOut: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  getNewTokens: NewTokenReponse;
  logout: LogoutReponse;
  signin: SignReponse;
  signup: SignReponse;
  updateAuth: SignReponse;
  updatePassword: UpdatePasswordReponse;
};


export type MutationLogoutArgs = {
  id: Scalars['String'];
};


export type MutationSigninArgs = {
  signInInput: SignInInput;
};


export type MutationSignupArgs = {
  signUpInput: SignUpInput;
};


export type MutationUpdateAuthArgs = {
  updateInput: UpdateInput;
};


export type MutationUpdatePasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};

export type NewTokenReponse = {
  __typename?: 'NewTokenReponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  auth: Auth;
  getUsers: User;
  hello: Scalars['String'];
};


export type QueryAuthArgs = {
  id: Scalars['String'];
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignReponse = {
  __typename?: 'SignReponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type SignUpInput = {
  email: Scalars['String'];
  lastName: Scalars['String'];
  newsLetter: Scalars['Boolean'];
  password: Scalars['String'];
  phone: Scalars['String'];
  username: Scalars['String'];
};

export type UpdateInput = {
  email: Scalars['String'];
  lastName: Scalars['String'];
  newsLetter: Scalars['Boolean'];
  phone: Scalars['String'];
  username: Scalars['String'];
};

export type UpdatePasswordInput = {
  password: Scalars['String'];
};

export type UpdatePasswordReponse = {
  __typename?: 'UpdatePasswordReponse';
  changed: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  newsLetter: Scalars['Boolean'];
  phone: Scalars['String'];
  role: Scalars['String'];
  scribe: Scalars['Boolean'];
  username: Scalars['String'];
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'User', id: string, role: string, username: string, lastName: string, email: string, phone: string, newsLetter: boolean, scribe: boolean } };

export type LoginMutationMutationVariables = Exact<{
  input: SignInInput;
}>;


export type LoginMutationMutation = { __typename?: 'Mutation', signin: { __typename?: 'SignReponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, role: string, username: string, lastName: string, email: string, phone: string, newsLetter: boolean, scribe: boolean } } };

export type LogoutMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutReponse', loggedOut: boolean } };

export type SignUpUserMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpUserMutation = { __typename?: 'Mutation', signup: { __typename?: 'SignReponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, role: string, username: string, lastName: string, email: string, phone: string, newsLetter: boolean, scribe: boolean } } };

export type UpdateAuthUserMutationVariables = Exact<{
  input: UpdateInput;
}>;


export type UpdateAuthUserMutation = { __typename?: 'Mutation', updateAuth: { __typename?: 'SignReponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, role: string, username: string, lastName: string, email: string, phone: string, newsLetter: boolean, scribe: boolean } } };

export type UpdatePasswordUserMutationVariables = Exact<{
  input: UpdatePasswordInput;
}>;


export type UpdatePasswordUserMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'UpdatePasswordReponse', changed: boolean } };
