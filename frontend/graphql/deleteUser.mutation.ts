
import gql from "graphql-tag";

export const DELETE_USER_MUTATION = gql`
mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
        changed
    }
  }
`;