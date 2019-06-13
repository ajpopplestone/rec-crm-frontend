import { action, observable,computed, runInAction } from 'mobx';
import { LOGIN_USER } from '../queries/userQueries' 
import jwt from 'jsonwebtoken'
// import moment from 'moment'
import checkToken from '../utils/checkToken'


class Store {
    @observable workbench = 'candidates'
    @observable currentUser = null
    @observable refreshDetails = null

    constructor(client) {
        this.client = client
    }

    @computed get currentPath() {
        if(this.workbench && this.currentUser) {
            return `/${this.workbench}/`
        } else {
            return '/login/'
        }
    }

    @action.bound
    refreshPage(details) {
        const user = checkToken()
        // console.log(user)
        if(user) {
            this.currentUser = user
            this.workbench = details.workbench 
            details.searchRefresh()
            if(details.openRecord) {
                details.openRecord(details.id)
            }
        } else {
            this.refreshDetails = details
        }
    }

    // @action
    // checkToken() {
    //     const token = localStorage.getItem('AUTH_TOKEN')
    //     console.log(token)
    //     if(token) {
    //         const user = jwt.decode(token)
    //         console.log(user)
    //         const dateExpired = moment().isAfter(moment.unix(user.exp))
    //         console.log(dateExpired)
    //         if(!dateExpired) {
    //             runInAction(() => {
    //                 this.currentUser = user
    //                 console.log(this.currentUser)
    //             })
    //         }
    //     }
    // }

    @action.bound
    setWorkbench(type) {
        this.workbench = type
        // console.log('workbench set', type)
        // this.checkToken()
    }

    @action.bound
    async login(values) {
        const variables = {
            data: {
                email: values.email,
                password: values.password
            }
        } 
        try {
            const { data } = await this.client.mutate({
                mutation: LOGIN_USER, 
                variables
            })
            
            const user = jwt.decode(data.login.token)
            localStorage.setItem('AUTH_TOKEN', data.login.token)
            // console.log(user)
            runInAction(() => {
                this.currentUser = user
                // console.log(this.currentUser)
                if(this.refreshDetails) {
                    if(this.refreshDetails.workbench) {
                        this.workbench = this.refreshDetails.workbench
                    }
                }
            })
            if(this.refreshDetails) {
                if(this.refreshDetails.searchRefresh){
                    this.refreshDetails.searchRefresh()
                }
                if(this.refreshDetails.id && this.refreshDetails.openRecord) {
                    this.refreshDetails.openRecord(this.refreshDetails.id)
                }
                this.refreshDetails = null
            }
        } catch (error) {
            console.log(error)
            // runInAction(() => {
            // })
        }
    }

    @action.bound
    logout() {
        localStorage.removeItem('AUTH_TOKEN')
        runInAction(() => {
            this.currentUser = null
        })
    }
}

export default Store