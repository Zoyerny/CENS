import gql from "graphql-tag";

export const GET_USERS_QUERY = gql`
  query GetUsersQuery {
    getUsers {
      users {
        id
        role
        username
        lastName
        email
        phone
        newsLetter
        scribe
      }
    }
  }
`;
