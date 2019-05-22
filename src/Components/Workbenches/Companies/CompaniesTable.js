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
        sorter: (a, b) => a.name.localeCompare(b.name)
      }, {
        title: 'Website',
        dataIndex: 'website',
        key: 'website',
        sorter: (a, b) => a.website.localeCompare(b.website)
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
        key: 'postcode',
        sorter: (a, b) => a.postcode.localeCompare(b.postcode)
      }, {
        title: 'Consultant',
        dataIndex: 'consultant',
        key: 'constultant',
        sorter: (a, b) => a.consultant.localeCompare(b.consultant)
      }, {
        title: 'Business Type',
        dataIndex: 'businessType',
        key: 'businessType',
        sorter: (a, b) => a.businessType.localeCompare(b.businessType)
      }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => a.status.localeCompare(b.status)
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