import { action, observable,computed, runInAction, toJS } from 'mobx';
import { GET_ALL_CANDS_BOOKINGS } from '../queries/candidateQueries' 
import moment from 'moment'
import { GET_BOOKING, UPDATE_BOOKING, CREATE_BOOKING, DELETE_BOOKING } from '../queries/bookingQueries'



class bookStore {
    @observable candBookData = null
    @observable candBookDataStatus = null
    @observable candBookDataError = null

    @observable searchTerms = null
    @observable plannerStart = moment().startOf('isoWeek')
    @observable openBook = null
    @observable saveState = null

    @observable bookingError = null

    constructor(client) {
        this.client = client
    }

    @computed get plannerDays() {
        const days = []
        for(let i = 0; i < 7; i++) {
            const day = this.plannerStart.clone()
            days.push(day.add(i, 'days'))
        }
        return days
    }

    @computed get currentVariables() {
        return {query: this.searchTerms}
    }

    @computed get displayBookData() {
        if(this.candBookData) {
            const data = []
            // console.log(this.candBookData)
            for (let candidate of toJS(this.candBookData)) {
                let currentCand = {}
                currentCand.key = candidate.id
                currentCand.name = `${candidate.forename} ${candidate.surname}`
                for (let key in candidate) {
                    switch (key) {
                        case 'consultant':
                            currentCand.consultant = candidate.consultant ? candidate.consultant.name : null
                            break
                        case 'status':
                            currentCand.status = candidate.status ? candidate.status.description : null
                            break
                        case 'role':
                            currentCand.role = candidate.role ? candidate.role.description : null
                            break
                        default:
                            currentCand[key] = candidate[key]
                    }                        
                }
                data.push(currentCand)
            }
            return data
        }
        return null
    }

    @action.bound
    setSaveState(type) {
        this.saveState = type
    }

    @action.bound
    async fetchBookingData() {
        this.bookDataStatus = "pending"
        this.bookDataError = null
        
        const res = await this.client.query({
            query: GET_ALL_CANDS_BOOKINGS, 
            variables: this.currentVariables
        })

        // console.log(res)
        
        runInAction(() => {
            if(res.errors) {
                this.candBookDataStatus = "error"
                this.candBookDataError = res.errors[0].message
            } else {
                this.candBookDataStatus = "fulfilled"
                this.candBookData = res.data.candidates
            }
        })
    }

    @action.bound 
    updateSearchTerms(term) {
        // console.log(term)
        this.searchTerms = term
    }

    @action.bound
    setPlannerStart(value) {
        // console.log(value)
        if(value) {
            this.plannerStart = value
        }
    }

    @action.bound
    async setOpenBook(book) {
        // console.log(book)
        if(book === null) {
            this.openBook = null
            return
        }
        if(book.id === 'new' || book.id === null) {
            const newBooking = {
                id: '',
                company: {
                    id: '',
                    name: '',
                },
                candidate: {
                    id: '',
                    forename: '',
                    surname: ''
                },
                role: {
                    shortCode: '',
                    description: ''
                },
                date: '',
                startTime: '',
                endTime: '',
                payRate: '',
                chargeRate: '',
                updatedAt: '',
                updatedBy: {
                    id: '',
                    name: ''
                },
                createdAt: '',
                createdBy: {
                    id: '',
                    name: '',
                }
            }
            if(book.cand) {
                newBooking.candidate.id = book.cand.id || ''
                newBooking.candidate.forename = book.cand.forename || ''
                newBooking.candidate.surname = book.cand.surname || ''
            }
            if(book.comp) {
                newBooking.company.id = book.comp.id || ''
                newBooking.company.name = book.comp.name || ''
            }
            if(book.date) {
                newBooking.date = book.date || ''
            }
            // console.log(newBooking)
            this.openBook = newBooking
        } else {
            const res = await this.client.query({
                query: GET_BOOKING, 
                variables: { id: book.id }
            })
            runInAction(() => {
                if(res.errors) {
                    console.log(res.errors[0].message)
                    this.openBook = null
                } else {
                    this.openBook = res.data.booking
                    this.plannerStart = moment(res.data.booking.date).startOf('isoWeek')
                }
            })
        }
    }

    @action.bound
    async saveBook(data, callback) {
        if(!this.openBook.id) {
            this.createBooking(data, callback)
        } else {
            this.updateBooking(data, callback)
        }
    }

    @action.bound
    async updateBooking(data, callback) {
        // console.log('update booking')

        const variables = {
            id: this.openBook.id,
            data: {
                ...data,
                date: data.date.format()
            }
        }
        // console.log(variables)
        
        await this.client.mutate({
            mutation: UPDATE_BOOKING, 
            variables
        })
        
        if(this.saveState === "OK") {
            this.openBook = null
        } else if (this.saveState === "APPLY") {
            // console.log(this.openBook)
            return true
        }

        this.fetchBookingData()
        if(callback){
            callback()
        }
    }

    @action.bound
    async createBooking(data, callback) {
        // console.log('create booking')
        console.log(data)

        const variables = {
            data: {
                ...data,
                date: data.date.format()
            }
        }
        // console.log(variables)
        // variables.data.date = variables.data.date.format()
        console.log(variables)
        
        const res = await this.client.mutate({
            mutation: CREATE_BOOKING, 
            variables
        })

        console.log(res)

        runInAction(() => {
            if(res.errors) {
                console.log(res.errors[0].message)
                this.bookingError(res.errors[0].message)
            } else {
                if(this.saveState === "OK") {
                    this.openBook = null
                } else if (this.saveState === "APPLY") {
                    // console.log(this.openBook)
                }
            }
        })
        


        this.fetchBookingData()
        if(callback){
            callback()
        }
    }

    @action.bound
    async deleteBooking(callback) {
        // console.log('delete booking')

        const variables = {
            id: this.openBook.id
        }
        // console.log(variables)
        
        await this.client.mutate({
            mutation: DELETE_BOOKING, 
            variables
        })

        this.openBook = null
        this.fetchBookingData()
        if(callback){
            callback()
        }
    }
}

export default bookStore