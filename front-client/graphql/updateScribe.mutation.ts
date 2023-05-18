
import gql from "graphql-tag";

export const UPDATE_SCRIBE_MUTATION = gql`
mutation UpdateUserScribe($input: AdminInput!) {
    updateUserScribe(adminInput: $input) {
        changed
    }
  }
`;