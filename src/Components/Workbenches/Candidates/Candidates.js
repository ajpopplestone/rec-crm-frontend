import React, { Component } from 'react'
import { observer, inject } from "mobx-react"

import SearchBar from '../../SearchBar'
import CandidatesTable from './CandidatesTable'


@inject('candStore', 'bookStore')
@observer
class Candidates extends Component {
    
    render() {
        const { candStore } = this.props

        return (
            <div>
                <SearchBar 
                    newRecord={() => candStore.setOpenCand("new")} 
                    updateSearchTerms={candStore.updateSearchTerms}
                    fetchData={candStore.fetchCandidateData}
                    />
                <CandidatesTable />
            </div>
        )
    }
}

export default Candidates