import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import { Table } from 'antd';

@inject('candStore')
@observer
class CandidatesTable extends Component {
    // createColumns(data) {
    //     const columns = Object.keys(data[0]).map(i => {
    //         const column = {
    //             title: i.charAt(0).toUpperCase() + i.slice(1),
    //             dataIndex: i,
    //             key: i
    //         }
    //         return column
    //     })
    //     columns.splice(columns.indexOf('key'))
    //     return columns
    // }

    onRow = (record, rowIndex) => {
        return {
            onClick: () => {this.props.candStore.setOpenCand(record.id)}
          }
    }

    columns = [{
        title: 'Forename',
        dataIndex: 'forename',
        key: 'forename',
        sorter: (a, b) => a.forename.localeCompare(b.forename)
      }, {
        title: 'Surname',
        dataIndex: 'surname',
        key: 'surname',
        sorter: (a, b) => a.surname.localeCompare(b.surname)
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
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        sorter: (a, b) => a.role.localeCompare(b.role)
      }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => a.status.localeCompare(b.status)
      }];

    displayTable = () => {
        const { candStore } = this.props
        switch (candStore.candDataStatus) {
            case "pending":
                return <h4>Loading candidates...</h4>
            case "error":
                return <h4>{candStore.candDataError}</h4>
            case "fulfilled":
                return (
                    <div>
                        {candStore.displayCandData && <Table columns={this.columns} dataSource={candStore.displayCandData} onRow={this.onRow}/>}
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

export default CandidatesTable