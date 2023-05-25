
import gql from "graphql-tag";

export const UPDATE_MUTATION = gql`
mutation updateAuthUser($input: UpdateInput!) {
    updateAuth(updateInput: $input) {
      accessToken
      refreshToken
      user {
        id
        role
        username
        lastName
        email
        phone
        newsLetter
        scribe
      }
    }
  }
`;