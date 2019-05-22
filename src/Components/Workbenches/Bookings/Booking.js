import React, { Component } from 'react';


class Booking extends Component {
    render() {
        let colour = "#77B7F6"
        if(this.props.role.businessType){
            colour = this.props.role.businessType.colour
        }

        return (
            <div 
                style={{ width: 'auto', color: "black", backgroundColor: colour, padding: '0', borderRadius: '5px' }}
                onClick={this.props.clickHandler}>
                <div style={{ margin: '3px' }}>{this.props.company.name}</div>
                <div style={{ margin: '3px' }}>{this.props.role.description}</div>
            </div>
        )
    }
}

export default Booking