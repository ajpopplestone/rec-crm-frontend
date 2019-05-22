import gql from 'graphql-tag'

export const GET_BOOKING = gql`
    query($id: ID!) {
        booking(id: $id) {
            id
            company {
                id
                name
            }
            candidate {
                id
                forename
                surname
            }
            role {
                shortCode
                description
            }
            date
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
`

export const GET_ALL_CAND_BOOKINGS = gql`
    query candBookings($candId: String!) {
        bookings(candId: $candId, orderBy: date_ASC) {
            id
            company {
                id
                name
            }
            date
            role {
                id
                shortCode
                description
            }
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
`

export const GET_ALL_COMP_BOOKINGS = gql`
    query compBookings($compId: String!) {
        bookings(compId: $compId, orderBy: date_ASC) {
            id
            candidate {
                id
                forename
                surname
            }
            date
            role {
                id
                shortCode
                description
            }
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
`

export const UPDATE_BOOKING = gql`
    mutation ($id: ID!, $data: UpdateBookingInput!) {
        updateBooking(id: $id, data: $data) {
            id
        }
    }
`

export const CREATE_BOOKING = gql`
    mutation ($data: CreateBookingInput!) {
        createBooking(data: $data) {
            id
        }
    }
`

export const DELETE_BOOKING = gql`
    mutation ($id: ID!) {
        deleteBooking(id: $id) {
            id
        }
    }
`