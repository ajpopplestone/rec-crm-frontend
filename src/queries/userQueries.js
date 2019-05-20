import gql from 'graphql-tag'

export const GET_ALL_USERS = gql`
    query {
        users {
            id
            name
        }
    }
`

export const LOGIN_USER = gql`
    mutation ($data: LoginUserInput!) {
        login(
            data: $data
        ) {
            token
            user {
                id
            }
        }
    }
`

