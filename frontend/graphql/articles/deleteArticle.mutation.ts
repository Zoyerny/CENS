
import gql from "graphql-tag";

export const DELETE_ARTICLE_MUTATION = gql`
mutation DeleteArticle($id: String!) {
    deleteArticle(id: $id) {
        changed
    }
  }
`;