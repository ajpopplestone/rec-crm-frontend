import { action, observable,computed, runInAction, toJS } from 'mobx';
import { GET_ALL_COMPANIES, GET_COMPANY, UPDATE_COMPANY, CREATE_COMPANY, DELETE_COMPANY } from '../queries/companyQueries' 
import { GET_ALL_COMP_BOOKINGS } from '../queries/bookingQueries' 

// import jwt from 'jsonwebtoken'


class Store {
    @observable compData = null
    @observable compDataStatus = null
    @observable compDataError = null
    @observable searchTerms = null
    @observable openComp = null
    @observable saveState = null
    @observable openBookings = null

    constructor(client) {
        this.client = client
    }

    @computed get currentVariables() {
        return {query: this.searchTerms}
    }

    @computed get displayCompData() {
        if(this.compData) {
                const companies = []
                for (let company of toJS(this.compData)) {
                    let currentComp = {}
                    currentComp.key = company.id
                    for (let key in company) {
                        switch (key) {
                            case 'consultant':
                                currentComp.consultant = company.consultant ? company.consultant.name : null
                                break
                            case 'status':
                                currentComp.status = company.status ? company.status.description : null
                                break
                            case 'businessType':
                                currentComp.businessType = company.businessType ? company.businessType.description : null
                                break
                            default:
                                currentComp[key] = company[key]
                        }                        
                    }
                    companies.push(currentComp)
                }

                return companies
            }
        return null
    }

    @action.bound
    setSaveState(type) {
        this.saveState = type
    }

    @action.bound
    async fetchCompBookings() {
        const variables = {
            compId: this.openComp.id
        }

        // console.log(variables)

        const res = await this.client.query({
            query: GET_ALL_COMP_BOOKINGS, 
            variables
        })

        // console.log(res)

        runInAction(() => {
            if(res.errors) {
                console.log(res.errors[0].message)
            } else {
                this.openBookings = res.data.bookings
                // console.log(this.openBookings)
            }
        })
    }

    @action.bound
    async fetchCompaniesData() {
        this.compDataStatus = "pending"
        this.compDataError = null
        
        const res = await this.client.query({
            query: GET_ALL_COMPANIES, 
            variables: this.currentVariables
        })

        // console.log(res)
        
        runInAction(() => {
            if(res.errors) {
                this.compDataStatus = "error"
                this.compDataError = res.errors[0].message
            } else {
                this.compDataStatus = "fulfilled"
                this.compData = res.data.companies
            }
        })
    }

    @action.bound 
    updateSearchTerms(term) {
        // console.log(term)
        this.searchTerms = term
    }

    @action.bound
    async setOpenComp(comp) {
        // console.log(comp)
        if(comp === 'new' || comp === null) {
            this.openComp = comp
        } else {
            const res = await this.client.query({
                query: GET_COMPANY, 
                variables: { id: comp }
            })

            runInAction(() => {
                if(res.errors) {
                    console.log(res.errors[0].message)
                    this.openComp = null
                } else {
                    this.openComp = res.data.company
                }
            })
            if(!res.errors) {
                this.fetchCompBookings()
            }
        }
    }

    @action.bound
    async saveComp(data) {
        if(this.openComp === 'new') {
            this.createCompany(data)
        } else {
            this.updateCompany(data)
        }
    }

    @action.bound
    async updateCompany(data) {
        // console.log('update company')

        const variables = {
            id: this.openComp.id,
            data
        }
        // console.log(variables)
        
        await this.client.mutate({
            mutation: UPDATE_COMPANY, 
            variables
        })
        
        if(this.saveState === "OK") {
            this.openComp = null
        } else if (this.saveState === "APPLY") {
            this.setOpenComp(this.openComp.id)
        }

        this.fetchCompaniesData()
    }

    @action.bound
    async createCompany(data) {
        // console.log('create company')
        const variables = {
            data
        }
        // console.log(variables)
        
        const newComp = await this.client.mutate({
            mutation: CREATE_COMPANY, 
            variables
        })

        // console.log(newComp.data.createCompany.id)
        
        if(this.saveState === "OK") {
            this.openComp = null
        } else if (this.saveState === "APPLY") {
            this.setOpenComp(newComp.data.createCompany.id)
        }


        this.fetchCompaniesData()
    }

    @action.bound
    async deleteCompany() {
        // console.log('delete Comp')

        const variables = {
            id: this.openComp.id
        }
        // console.log(variables)
        
        await this.client.mutate({
            mutation: DELETE_COMPANY, 
            variables
        })

        this.openComp = null
        this.fetchCompaniesData()
    }
}

export default Store