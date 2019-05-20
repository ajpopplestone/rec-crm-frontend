import React, { Component } from 'react'
import { Icon } from 'antd'

class ModalTitle extends Component {
    render() {
        return (
            <React.Fragment>
                <h2>Candidate Details</h2><Icon type="delete" style={{display: 'inlineBlock'}}/>
            </React.Fragment>
        )
    }
}

export default ModalTitle