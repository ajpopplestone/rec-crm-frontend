import { action, observable, computed, runInAction, toJS } from 'mobx';
import { GET_ALL_CANDIDATES } from '../queries/candidateQueries' 
import { GET_ALL_BOOKINGS } from '../queries/bookingQueries' 

class AnalyticalStore {
    @observable candData = null
    @observable candDataStatus = null
    @observable candDataError = null
    @observable bookData = null
    @observable bookDataStatus = null
    @observable bookDataError = null

    constructor(client) {
        this.client = client
    }

    @computed get displayCandByRole() {
        if(this.candData) {
            const rolesCount = {}
            for (let candidate of toJS(this.candData)) {
                if(candidate.role.shortCode) {
                    if(!rolesCount[candidate.role.shortCode] || rolesCount[candidate.role.shortCode] === 0){
                        rolesCount[candidate.role.shortCode] = 0
                    } 
                    rolesCount[candidate.role.shortCode]++
                }
            }
            console.log(rolesCount)       
            const data = []
            for (let key in rolesCount) {
                const bar = {}
                bar.x = key
                bar.y = rolesCount[key]
                data.push(bar)
            }
            console.log(data)
            return data       
        }
        return null
    }

    @computed get displayBookByRole() {
        if(this.bookData) {
            const rolesCount = {}
            for (let booking of toJS(this.bookData)) {
                if(booking.role.shortCode) {
                    if(!rolesCount[booking.role.shortCode] || rolesCount[booking.role.shortCode] === 0){
                        rolesCount[booking.role.shortCode] = 0
                    } 
                    rolesCount[booking.role.shortCode]++
                }
            }
            console.log(rolesCount)       
            const data = []
            for (let key in rolesCount) {
                const bar = {}
                bar.x = key
                bar.y = rolesCount[key]
                data.push(bar)
            }
            console.log(data)
            return data       
        }
        return null
    }

    @action.bound
    async fetchData() {        
        const candData = await this.client.query({
            query: GET_ALL_CANDIDATES
        })

        console.log(candData)
        
        runInAction(() => {
            if(candData.errors) {
                this.candDataStatus = "error"
                this.candDataError = candData.errors[0].message
            } else {
                this.candDataStatus = "fulfilled"
                this.candData = candData.data.candidates
            }
        })

        const bookData = await this.client.query({
            query: GET_ALL_BOOKINGS
        })

        console.log(bookData)
        
        runInAction(() => {
            if(bookData.errors) {
                this.bookDataStatus = "error"
                this.bookDataError = bookData.errors[0].message
            } else {
                this.bookDataStatus = "fulfilled"
                this.bookData = bookData.data.bookings
            }
        })
    }

    // @action.bound
    // async fetchBookingData() {        
    //     const res = await this.client.query({
    //         query: GET_ALL_BOOKINGS
    //     })

    //     console.log(res)
        
    //     runInAction(() => {
    //         if(res.errors) {
    //             this.bookDataStatus = "error"
    //             this.bookDataError = res.errors[0].message
    //         } else {
    //             this.bookDataStatus = "fulfilled"
    //             this.bookData = res.data.candidates
    //         }
    //     })
    // }
}

export default AnalyticalStore