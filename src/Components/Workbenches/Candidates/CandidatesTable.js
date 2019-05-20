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
      }, {
        title: 'Surname',
        dataIndex: 'surname',
        key: 'surname',
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
        title: 'Role',
        dataIndex: 'role',
        key: 'role'
      }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
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