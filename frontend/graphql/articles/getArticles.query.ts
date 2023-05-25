import gql from "graphql-tag";

export const GET_ARTICLES_QUERY = gql`
  query GetArticlesQuery {
    getArticles {
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
