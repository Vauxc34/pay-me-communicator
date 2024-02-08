import { gql } from '@apollo/client'

export const GET_ALL_USERS = gql`
query getAllUsers {
    getAllUsers {
        id
        first_name
    }
}`

/* conversation part */

export const GET_ALL_CONVERSATIONS = gql`
query {
    getConversationAll {
        idUser
    }
}
`