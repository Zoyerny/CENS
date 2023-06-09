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

export type AdminInput = {
  bool: Scalars['Boolean'];
  id: Scalars['String'];
};

export type Article = {
  __typename?: 'Article';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  dislike: Scalars['Float'];
  id: Scalars['ID'];
  image: Scalars['String'];
  like: Scalars['Float'];
  name: Scalars['String'];
  tag: Array<Scalars['String']>;
  updatedAt: Scalars['String'];
  user: User;
  validate: Scalars['Boolean'];
};

export type Auth = {
  __typename?: 'Auth';
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type ChangeResponse = {
  __typename?: 'ChangeResponse';
  changed: Scalars['Boolean'];
};

export type GetArticleResponse = {
  __typename?: 'GetArticleResponse';
  article: Article;
};

export type GetArticlesResponse = {
  __typename?: 'GetArticlesResponse';
  articles: Array<Article>;
};

export type GetUsersResponse = {
  __typename?: 'GetUsersResponse';
  users: Array<User>;
};

export type LogoutReponse = {
  __typename?: 'LogoutReponse';
  loggedOut: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle: ChangeResponse;
  deleteArticle: ChangeResponse;
  deleteUser: ChangeResponse;
  getNewTokens: NewTokenReponse;
  logout: LogoutReponse;
  signin: SignReponse;
  signup: SignReponse;
  updateArticle: ChangeResponse;
  updateArticleValidate: ChangeResponse;
  updateAuth: SignReponse;
  updatePassword: UpdatePasswordReponse;
  updateUserAdmin: ChangeResponse;
  updateUserPraticien: ChangeResponse;
  updateUserScribe: ChangeResponse;
};


export type MutationCreateArticleArgs = {
  writeInput: WriteInput;
};


export type MutationDeleteArticleArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
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


export type MutationUpdateArticleArgs = {
  writeUpdateInput: WriteUpdateInput;
};


export type MutationUpdateArticleValidateArgs = {
  adminInput: AdminInput;
};


export type MutationUpdateAuthArgs = {
  updateInput: UpdateInput;
};


export type MutationUpdatePasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};


export type MutationUpdateUserAdminArgs = {
  adminInput: AdminInput;
};


export type MutationUpdateUserPraticienArgs = {
  adminInput: AdminInput;
};


export type MutationUpdateUserScribeArgs = {
  adminInput: AdminInput;
};

export type NewTokenReponse = {
  __typename?: 'NewTokenReponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  auth: Auth;
  getArticles: GetArticlesResponse;
  getMultipleArticle: GetArticlesResponse;
  getOneArticle: GetArticleResponse;
  getUsers: GetUsersResponse;
  hello: Scalars['String'];
};


export type QueryAuthArgs = {
  id: Scalars['String'];
};


export type QueryGetMultipleArticleArgs = {
  id: Scalars['String'];
};


export type QueryGetOneArticleArgs = {
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

export type WriteInput = {
  articleName: Scalars['String'];
  content: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  tags: Array<Scalars['String']>;
  userId: Scalars['String'];
};

export type WriteUpdateInput = {
  articleId: Scalars['String'];
  articleName: Scalars['String'];
  content: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  tag: Array<Scalars['String']>;
};

export type CreateArticleMutationVariables = Exact<{
  input: WriteInput;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'ChangeResponse', changed: boolean } };

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: { __typename?: 'ChangeResponse', changed: boolean } };

export type GetArticlesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticlesQueryQuery = { __typename?: 'Query', getArticles: { __typename?: 'GetArticlesResponse', articles: Array<{ __typename?: 'Article', id: string, name: string, image: string, description: string, content: string, tag: Array<string>, like: number, dislike: number, validate: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', id: string, role: string, username: string, lastName: string, email: string, phone: string, newsLetter: boolean, scribe: boolean } }> } };

export type GetMultipleArticleQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetMultipleArticleQuery = { __typename?: 'Query', getMultipleArticle: { __typename?: 'GetArticlesResponse', articles: Array<{ __typename?: 'Article', id: string, name: string, image: string, description: string, content: string, tag: Array<string>, like: number, dislike: number, validate: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', id: string, role: string, username: string, lastName: string, email: string, phone: string, newsLetter: boolean, scribe: boolean } }> } };

export type GetOneArticleQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetOneArticleQuery = { __typename?: 'Query', getOneArticle: { __typename?: 'GetArticleResponse', article: { __typename?: 'Article', id: string, name: string, image: string, description: string, content: string, tag: Array<string>, like: number, dislike: number, validate: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', id: string, role: string, username: string, lastName: string, email: string, phone: string, newsLetter: boolean, scribe: boolean } } } };

export type UpdateArticleMutationVariables = Exact<{
  input: WriteUpdateInput;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: { __typename?: 'ChangeResponse', changed: boolean } };

export type UpdateArticleValidateMutationVariables = Exact<{
  input: AdminInput;
}>;


export type UpdateArticleValidateMutation = { __typename?: 'Mutation', updateArticleValidate: { __typename?: 'ChangeResponse', changed: boolean } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'ChangeResponse', changed: boolean } };

export type GetUsersQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQueryQuery = { __typename?: 'Query', getUsers: { __typename?: 'GetUsersResponse', users: Array<{ __typename?: 'User', id: string, role: string, username: string, lastName: string, email: string, phone: string, newsLetter: boolean, scribe: boolean }> } };

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

export type UpdateUserAdminMutationVariables = Exact<{
  input: AdminInput;
}>;


export type UpdateUserAdminMutation = { __typename?: 'Mutation', updateUserAdmin: { __typename?: 'ChangeResponse', changed: boolean } };

export type UpdatePasswordUserMutationVariables = Exact<{
  input: UpdatePasswordInput;
}>;


export type UpdatePasswordUserMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'UpdatePasswordReponse', changed: boolean } };

export type UpdateUserPraticienMutationVariables = Exact<{
  input: AdminInput;
}>;


export type UpdateUserPraticienMutation = { __typename?: 'Mutation', updateUserPraticien: { __typename?: 'ChangeResponse', changed: boolean } };

export type UpdateUserScribeMutationVariables = Exact<{
  input: AdminInput;
}>;


export type UpdateUserScribeMutation = { __typename?: 'Mutation', updateUserScribe: { __typename?: 'ChangeResponse', changed: boolean } };
