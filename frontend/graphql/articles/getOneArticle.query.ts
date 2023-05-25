import gql from "graphql-tag";

export const GET_ONEARTICLE_QUERY = gql`
  query GetOneArticle($id: String!) {
    getOneArticle(id: $id) {
        article{
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
