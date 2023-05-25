import gql from "graphql-tag";

export const GET_MULTIPLE_ARTICLE_QUERY = gql`
  query GetMultipleArticle($id: String!) {
    getMultipleArticle(id: $id) {
        articles{
            id
            name
            image
            description
            content
            tag
            like
            dislike
            validate
            user {
                id
                role
                username
                lastName
                email
                phone
                newsLetter
                scribe
            }
            createdAt
            updatedAt
        }
    }
  }
`;
