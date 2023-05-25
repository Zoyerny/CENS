
import gql from "graphql-tag";

export const UPDATE_ARTICLE_MUTATION = gql`
mutation UpdateArticle($input: WriteUpdateInput!) {
    updateArticle(writeUpdateInput: $input) {
        changed
    }
  }
`;