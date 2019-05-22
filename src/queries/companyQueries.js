import gql from 'graphql-tag'

export const GET_ALL_COMPANIES = gql`
    query($query: String) {
        companies(query: $query, orderBy: name_ASC) {
            id
            name
            email
            website
            postcode
            phone
            status {
                id
                description
                shortCode
            }
            businessType {
                id
                description
                shortCode
            }
            consultant {
                id
                name
            }
        }
    }
`

export const GET_COMPANY = gql`
    query($id: ID!) {
        company(id: $id) {
            id
            name
            email
            website
            postcode
            phone
            status {
                id
                description
                shortCode
            }
            businessType {
                id
                description
                shortCode
            }
            consultant {
                id
                name
            }
            updatedBy {
                id
                name
            }
            createdBy {
                id
                name
            }
            updatedAt
            createdAt
            # bookings {
            #     id
            #     candidate {
            #         id
            #         forename
            #         surname
            #     }
            #     date
            #     role {
            #         shortCode
            #         description
            #     }
            #     updatedAt
            #     updatedBy {
            #         id
            #         name
            #     }
            #     createdAt
            #     createdBy {
            #         id
            #         name
            #     }
            # }
        }
    }
`

export const COMPANY_SHORT_SEARCH = gql`
    query($query: String, $first: Int!) {
        companies(query: $query, first: $first, orderBy: name_ASC) {
            id
            name
        }
    }
`

export const UPDATE_COMPANY = gql`
    mutation ($id: ID!, $data: UpdateCompanyInput!) {
        updateCompany(id: $id, data: $data) {
            id
        }
    }
`

export const CREATE_COMPANY = gql`
    mutation ($data: CreateCompanyInput!) {
        createCompany(data: $data) {
            id
        }
    }
`

export const DELETE_COMPANY = gql`
    mutation ($id: ID!) {
        deleteCompany(id: $id) {
            id
        }
    }
`