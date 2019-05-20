import gql from 'graphql-tag'

export const createCodeQuery = (type) => {
    return gql`
        query {
            ${type} {
                id
                shortCode
                description
            }
    }
    `
}

// export const GET_CODEVALUES = gql`
//     query($type: String!) {
//         codeValues(type: $type) {
//             id
//             value: description
//         }
//     }
// `
