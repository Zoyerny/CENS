import gql from "graphql-tag";

export const CREATE_ARTICLE_MUTATION = gql`
  mutation CreateArticle($input: WriteInput!) {
    createArticle(writeInput: $input) {
      changed
    }
  }
`;