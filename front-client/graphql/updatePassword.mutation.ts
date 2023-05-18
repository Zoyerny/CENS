
import gql from "graphql-tag";

export const UPDATEPASSWORD_MUTATION = gql`
mutation updatePasswordUser($input: UpdatePasswordInput!) {
    updatePassword(updatePasswordInput: $input) {
      changed
    }
  }
`;