import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation createUser(
        $first_name: String!
        $last_name: String!
        $profile_pic: String!
        $password: String!,
        $email: String!,
        $gender: String!,
        $phone_number: Int!,
        $friend_list: [friend_list]!,
        $birth_date: String! 
            ) {
        createUser(
        first_name: $first_name,
        last_name: $last_name,
        profile_pic: $profile_pic,
        password: $password,
        email: $email,
        gender: $gender,
        phone_number: $phone_number,
        friend_list: $friend_list,
        birth_date: $birth_date
             ) {
                first_name
                last_name
             }
}`



export const DELETE_USER = gql`
    mutation deleteUser(
            $first_name: String!,
            ) {
        deleteUser(
            first_name: $first_name,
             ) {
                id
             }
    }
`


export const UPDATE_USER = gql`

    mutation updateUser(
            $id: Int!,
            $first_name: String!,
            ) {

        updateUser(
            id: $id,
            first_name: $first_name,
             ) {
                id
             }

    }

`


/* */

export const CREATE_MESSAGE = gql`
  mutation createMessage($idUser: Int!, $users: [UserInput!], $messages: [MessageInput!]) {
    createMessage(idUser: $idUser, users: $users, messages: $messages) {
      idUser
    }
  }

  input UserInput {
    name: String
    surname: String
  }

  input MessageInput {
    user: String
    content: String
  }
`;