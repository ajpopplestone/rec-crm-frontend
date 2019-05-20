import React, { Component } from 'react';


class Booking extends Component {
    render() {
        return (
            <div 
                style={{ width: 'auto', color: "black", backgroundColor: '#77B7F6', padding: '0', borderRadius: '5px' }}
                onClick={this.props.clickHandler}>
                <div style={{ margin: '3px' }}>{this.props.company.name}</div>
                <div style={{ margin: '3px' }}>{this.props.role.description}</div>
            </div>
        )
    }
}

export default Booking