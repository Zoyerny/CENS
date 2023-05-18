
import gql from "graphql-tag";

export const UPDATE_PRATICIEN_MUTATION = gql`
mutation UpdateUserPraticien($input: AdminInput!) {
    updateUserPraticien(adminInput: $input) {
        changed
    }
  }
`;