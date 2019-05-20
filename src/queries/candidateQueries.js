import gql from 'graphql-tag'

export const GET_ALL_CANDIDATES = gql`
    query($query: String) {
        candidates(query: $query) {
            id
            forename
            surname
            address
            postcode
            status {
                id
                description
                shortCode
            }
            email
            phone
            role {
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

export const GET_ALL_CANDS_BOOKINGS = gql`
    query($query: String) {
        candidates(query: $query) {
            id
            forename
            surname
            # postcode
            # status {
            #     id
            #     description
            #     shortCode
            # }
            # email
            # phone
            # role {
            #     id
            #     description
            #     shortCode
            # }
            # consultant {
            #     id
            #     name
            # }
            bookings {
                id
                company {
                    id
                    name
                }
                date
                role {
                    shortCode
                    description
                }
                startTime
                endTime
                payRate
                chargeRate
                updatedAt
                updatedBy {
                    id
                    name
                }
                createdAt
                createdBy {
                    id
                    name
                }
            }
        }
    }
`

export const GET_CANDIDATE = gql`
    query($id: ID!) {
        candidate(id: $id) {
            id
            forename
            surname
            address
            postcode
            status {
                id
                description
                shortCode
            }
            email
            phone
            role {
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
            #     company {
            #         id
            #         name
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

export const CANDIDATE_SHORT_SEARCH = gql`
    query($query: String, $first: Int!) {
        candidates(query: $query, first: $first, ) {
            id
            forename
            surname
        }
    }
`

export const UPDATE_CANDIDATE = gql`
    mutation ($id: ID!, $data: UpdateCandidateInput!) {
        updateCandidate(id: $id, data: $data) {
            id
        }
    }
`

export const CREATE_CANDIDATE = gql`
    mutation ($data: CreateCandidateInput!) {
        createCandidate(data: $data) {
            id
        }
    }
`

export const DELETE_CANDIDATE = gql`
    mutation ($id: ID!) {
        deleteCandidate(id: $id) {
            id
        }
    }
`
