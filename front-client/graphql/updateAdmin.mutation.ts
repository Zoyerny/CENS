
import gql from "graphql-tag";

export const UPDATE_ADMIN_MUTATION = gql`
mutation UpdateUserAdmin($input: AdminInput!) {
    updateUserAdmin(adminInput: $input) {
        changed
    }
  }
`;