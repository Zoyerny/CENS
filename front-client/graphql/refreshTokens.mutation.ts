import gql from "graphql-tag";

export const REFRESH_TOKENS_MUTATION = gql`
  mutation RefreshTokensMutation($id: String!) {
    getRefreshTokens(id: $id) {
      accessToken
      refreshToken
    }
  }
`;
