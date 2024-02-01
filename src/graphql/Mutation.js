import { gql } from '@apollo/client'

export const CREATE_USER = gql`

    mutation createUser(
            $first_name: String!,
            $last_name: String!,
            $email: String!,
            $gender:	String!,
            $ip_address: String!
            ) {

        createUser(
            first_name: $first_name,
            last_name: $last_name,
            email: $email,
            gender:	$gender,
            ip_address: $ip_address,
             ) {
                id
                first_name
                last_name
             }

    }

`

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
