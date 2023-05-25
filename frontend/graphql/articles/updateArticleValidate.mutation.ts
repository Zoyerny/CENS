
import gql from "graphql-tag";

export const UPDATE_ARTICLEVALIDATE_MUTATION = gql`
mutation UpdateArticleValidate($input: AdminInput!) {
    updateArticleValidate(adminInput: $input) {
        changed
    }
  }
`;