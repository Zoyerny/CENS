import gql from "graphql-tag";

export const REFRESH_TOKENS_MUTATION = gql`
  mutation RefreshTokensMutation($id: String!) {
    getNewTokens() {
      accessToken
      refreshToken
    }
  }
`;
