import jwt from 'jsonwebtoken'
import moment from 'moment'

const checkToken = () => {
    const token = localStorage.getItem('AUTH_TOKEN')
    let user = null
        // console.log(token)
    if(token) {
        user = jwt.decode(token)
        // console.log(user)
        const dateExpired = moment().isAfter(moment.unix(user.exp))
        // console.log(dateExpired)
        if(!dateExpired) {
            return user
        }
    }
    return user
}

export { checkToken as default }