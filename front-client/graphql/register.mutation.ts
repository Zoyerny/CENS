
import gql from "graphql-tag";

export const REGISTER_MUTATION = gql`
mutation signUpUser($input: SignUpInput!) {
    signup(signUpInput: $input) {
      accessToken
      refreshToken
      user {
        id
        role
        username
        name
        email
        phone
      }
    }
  }
`;