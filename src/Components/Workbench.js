import React, { Component } from 'react';
import Candidates from './Workbenches/Candidates/Candidates'
import Companies from './Workbenches/Companies/Companies'
import Bookings from './Workbenches/Bookings/Bookings'
// import Home from './Workbenches/Home/Home'

import CandModal from './Workbenches/Candidates/CandModal'
import CompModal from './Workbenches/Companies/CompModal'

class Workbench extends Component {
    render() {
        let workbench = null

        switch (this.props.workbench) {
            case 'candidates':
                workbench = <Candidates />
                break
            case 'companies':
                workbench = <Companies />
                break
            case 'bookings':
                workbench = <Bookings />
                break
            // case 'home':
            //     workbench =  <Home />
            //     break
            // case 'admin':
            //     workbench = <Admin />
            //     break
            default: workbench = null
        }
        
        return (
            <div>
                {workbench}
                <CandModal />
                <CompModal />
            </div>
        )
    }
}

export default Workbench