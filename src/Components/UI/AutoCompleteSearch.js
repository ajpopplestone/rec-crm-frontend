import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import { AutoComplete } from 'antd'


class AutoCompleteSearch extends Component {
    state = {
        dateSource: []
    }

    onSelect = (value) => {
            // console.log('onSelect', value)
            this.props.setFieldValue(this.props.name, value)
        }

    handleBlur = (value) => {
        console.log(value)
        if(!value) {
            this.props.setFieldValue(this.props.name, null)
        }
    }
    
    handleSearch = (value) => {
        const { client } = this.props
        const variables = {
            query: value,
            first: 10
        }
        client.query({
            query: this.props.query, 
            variables
        }).then(( { data } ) => {
            const records = data[this.props.type]
            const newDataSoure = records.map(record => {
                const returnValue = {}
                if(this.props.type === 'candidates') {
                    returnValue.value = record.id
                    returnValue.text = `${record.forename} ${record.surname}`
                } else if ( this.props.type === 'companies' ) {
                    returnValue.value = record.id
                    returnValue.text = record.name
                }
                return returnValue
            })
            this.setState({dataSource: newDataSoure})
            // console.log(newDataSoure)        
        })
    }

    render() {
        const { dataSource } = this.state
        return (
            <React.Fragment>
                <AutoComplete
                    dataSource={dataSource}
                    style={{ width: 200 }}
                    onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                    onBlur={this.handleBlur}
                    defaultValue={this.props.defaultValue}
                    placeholder={this.props.placeholder}
                />
            </React.Fragment>
        )
    }
}

export default withApollo(AutoCompleteSearch)