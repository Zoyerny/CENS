
import gql from "graphql-tag";

export const GET_USERS_QUERY = gql`
  query {
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
