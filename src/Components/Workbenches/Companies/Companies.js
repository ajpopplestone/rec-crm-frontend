import React, { Component } from 'react'
import { observer, inject } from "mobx-react"

import SearchBar from '../../SearchBar'
import CompaniesTable from './CompaniesTable'


@inject('compStore')
@observer
class Companies extends Component {
        
    render() {
        const { compStore } = this.props
        // console.log(compStore)

        return (
            <div>
                <SearchBar 
                    newRecord={() => compStore.setOpenComp("new")} 
                    updateSearchTerms={compStore.updateSearchTerms}
                    fetchData={compStore.fetchCompaniesData}
                    value={compStore.searchTerms}
                    />
                <CompaniesTable />
            </div>
        )
    }
}

export default Companies