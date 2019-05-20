import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import { Table } from 'antd';

@inject('compStore')
@observer
class CompaniesTable extends Component {
    createColumns(data) {
        const columns = Object.keys(data[0]).map(i => {
            const column = {
                title: i.charAt(0).toUpperCase() + i.slice(1),
                dataIndex: i,
                key: i
            }
            return column
        })
        columns.splice(columns.indexOf('key'))
        return columns
    }

    onRow = (record, rowIndex) => {
        return {
            onClick: () => {this.props.compStore.setOpenComp(record.id)}
          }
    }

    columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: 'Website',
        dataIndex: 'website',
        key: 'website',
      }, {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
      }, {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone'
      }, {
        title: 'Postcode',
        dataIndex: 'postcode',
        key: 'postcode'
      }, {
        title: 'Consultant',
        dataIndex: 'consultant',
        key: 'constultant'
      }, {
        title: 'Business Type',
        dataIndex: 'businessType',
        key: 'businessType'
      }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      }];

    displayTable = () => {
        const { compStore } = this.props
        switch (compStore.compDataStatus) {
            case "pending":
                return <h4>Loading Companies...</h4>
            case "error":
                return <h4>{compStore.compDataError}</h4>
            case "fulfilled":
                return (
                    <div>
                        {compStore.displayCompData && <Table columns={this.columns} dataSource={compStore.displayCompData} onRow={this.onRow}/>}
                    </div>
                )
            default:
                return null
        }
    }
    
    render() {
        return (
            <div>
                {this.displayTable()}
            </div>
        )
    }
}

export default CompaniesTable