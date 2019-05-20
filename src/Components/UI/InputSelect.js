import React, { Component } from 'react'

import { Select } from 'antd'
const Option = Select.Option

class InputSelect extends Component {
    createOptions() {
        // console.log(this.props.options)
        if(this.props.name === 'consultant') {
            const unspecified = []
            unspecified.push(<Option value="" key="Unspecified">Unspecified</Option>)
                        
            const options =  this.props.options.map(option => {
                return <Option value={option.id} key={option.id}>{option.name}</Option>
            })

            return unspecified.concat(options)
        } else {
            return this.props.options.map(option => {
                return <Option value={option.shortCode} key={option.id}>{option.description}</Option>
            })
        }
    }

    handleChange = (value) => {
        this.props.setFieldValue(this.props.name, value)
    }

    render() {
        const { name, value } = this.props
        // this.createOptions()
        return (
            <Select component="select" name={name} defaultValue="" value={value} onChange={this.handleChange}>
                {this.createOptions()}
            </Select>
        )
    }
}

export default InputSelect