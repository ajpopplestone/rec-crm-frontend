import { action, observable,computed, runInAction, toJS } from 'mobx';
import { GET_ALL_CANDIDATES, GET_CANDIDATE, UPDATE_CANDIDATE, CREATE_CANDIDATE, DELETE_CANDIDATE } from '../queries/candidateQueries' 
import { GET_ALL_CAND_BOOKINGS } from '../queries/bookingQueries' 

class CandStore {
    @observable candData = null
    @observable candDataStatus = null
    @observable candDataError = null
    @observable searchTerms = null
    @observable openCand = null
    @observable saveState = null
    @observable openBookings = null

    constructor(client) {
        this.client = client
    }
    
    @action.bound 
    updateSearchTerms(term) {
        // console.log(term)
        this.searchTerms = term
    }

    @computed get currentVariables() {
        return {query: this.searchTerms}
    }

    @computed get displayCandData() {
        if(this.candData) {
            const candidates = []
                for (let candidate of toJS(this.candData)) {
                    let currentCand = {}
                    currentCand.key = candidate.id
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
                    candidates.push(currentCand)
                }

                return candidates       
            }
        return null
    }

    @action.bound
    setSaveState(type) {
        this.saveState = type
    }

    @action.bound
    async fetchCandBookings() {
        const variables = {
            candId: this.openCand.id
        }

        // console.log(variables)

        const res = await this.client.query({
            query: GET_ALL_CAND_BOOKINGS, 
            variables
        })

        // console.log(res)

        runInAction(() => {
            if(res.errors) {
                this.candDataStatus = "error"
                console.log(res.errors[0].message)
            } else {
                this.openBookings = res.data.bookings
                // console.log(this.openBookings)
            }
        })
    }

    @action.bound
    async fetchCandidateData() {
        this.candDataStatus = "pending"
        this.candDataError = null

        // console.log(this.currentVariables)
        
        const res = await this.client.query({
            query: GET_ALL_CANDIDATES, 
            variables: this.currentVariables
        })

        // console.log(res)
        
        runInAction(() => {
            if(res.errors) {
                this.candDataStatus = "error"
                this.candDataError = res.errors[0].message
            } else {
                this.candDataStatus = "fulfilled"
                this.candData = res.data.candidates
            }
        })
    }

    @action.bound
    async setOpenCand(cand) {
        // console.log(cand)
        if(cand === 'new' || cand === null) {
            this.openCand = cand
        } else {
            const res = await this.client.query({
                query: GET_CANDIDATE, 
                variables: { id: cand }
            })

            runInAction(() => {
                if(res.errors) {
                    console.log(res.errors[0].message)
                    this.openCand = null
                } else {
                    this.openCand = res.data.candidate
                }
            })
            if(!res.errors) {
                this.fetchCandBookings()
            }
        }
    }

    @action.bound
    async saveCand(data) {
        if(this.openCand === 'new') {
            this.createCandidate(data)
        } else {
            this.updateCandidate(data)
        }
    }

    @action.bound
    async updateCandidate(data) {
        // console.log('update candidate')

        const variables = {
            id: this.openCand.id,
            data
        }
        // console.log(variables)
        
        await this.client.mutate({
            mutation: UPDATE_CANDIDATE, 
            variables
        })
        
        if(this.saveState === "OK") {
            this.openCand = null
        } else if (this.saveState === "APPLY") {
            this.setOpenCand(this.openCand.id)
        }

        this.fetchCandidateData()
    }

    @action.bound
    async createCandidate(data) {
        // console.log('create candidate')
        const variables = {
            data
        }
        // console.log(variables)
        
        const newCand = await this.client.mutate({
            mutation: CREATE_CANDIDATE, 
            variables
        })

        // console.log(newCand.data.createCandidate.id)
        
        if(this.saveState === "OK") {
            this.openCand = null
        } else if (this.saveState === "APPLY") {
            this.setOpenCand(newCand.data.createCandidate.id)
        }


        this.fetchCandidateData()
    }

    @action.bound
    async deleteCandidate() {
        // console.log('delete Cand')

        const variables = {
            id: this.openCand.id
        }
        // console.log(variables)
        
        await this.client.mutate({
            mutation: DELETE_CANDIDATE, 
            variables
        })

        this.openCand = null
        this.fetchCandidateData()
    }
}

export default CandStore