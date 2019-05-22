import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import { Table, Typography } from 'antd';
import Booking from './Booking'

import moment from 'moment'

const { Text } = Typography

@inject('candStore', 'bookStore')
@observer
class Planner extends Component {
  state = {
    nameWidth: 16,
    firstDay: 1,
  }  
  
  // createColumns(data) {
  //       const columns = Object.keys(data[0]).map(i => {
  //           const column = {
  //               title: i.charAt(0).toUpperCase() + i.slice(1),
  //               dataIndex: i,
  //               key: i
  //           }
  //           return column
  //       })
  //       columns.splice(columns.indexOf('key'))
  //       return columns
  //   }

    // onRow = (record, rowIndex) => {
    //     return {
    //         onClick: () => {this.props.bookStore.setOpenBook(record.id)}
    //       }
    // }

    generateColumns = () => {
      const { bookStore } = this.props
      const columns = []
      columns.push({
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: `${this.state.nameWidth}%`,
        className: "nameColumn",
        render: this.nameRender(),
        sorter: (a, b) => a.surname.localeCompare(b.surname)
      })
      
      for(let i = 0; i < 7; i++) {
        const column = {}
        column.title = `${bookStore.plannerDays[i].format('ddd Do MMM')}`
        column.dataIndex = `${bookStore.plannerDays[i].format('YYYMMDD')}`
        column.key = `${bookStore.plannerDays[i].format('YYYMMDD')}`
        column.width = `${(100 - this.state.nameWidth)/7}%`
        column.render = this.generateRender(bookStore.plannerDays[i])
        
        columns.push(column)
      }
      return columns
    }

    nameRender = () => (text, {id, forename, surname}, index) => {
      const { candStore } = this.props

      return (
        <div onClick={() => candStore.setOpenCand(id)} className="plannerName">
          <Text className="nameText" onClick={() => candStore.setOpenCand(id)}>
            {forename} {surname}
          </Text>
        </div>
      )
    }
    
    generateRender = (day) => (text, { bookings, id, forename, surname }, index) => {
      // console.log(day)
      // const dayString = day.format('DD/MM/YYYY')
      // console.log(dayString)
      const { bookStore } = this.props
      
      const bookingIndex = bookings.findIndex(booking => {
        return moment(booking.date).isSame(day, 'day')
      })

      // console.log(bookingIndex)
      const cellData = { 
        id: 'new',
        cand: {
          id,
          forename,
          surname
        },
        date: day 
      }
      // console.log(cellData)
      
      if(bookingIndex !== -1) {
          return <Booking {...bookings[bookingIndex]} clickHandler={() => bookStore.setOpenBook({id: bookings[bookingIndex].id})}/>
        } else {
          return (
              <div 
                onClick={() => bookStore.setOpenBook(cellData)} 
                style={{height: '100%', width: '100%', minHeight: '51px'}}/>
            )
        }
    }

    displayTable = () => {
        const { bookStore } = this.props
        switch (bookStore.candBookDataStatus) {
            case "pending":
                return <h4>Loading bookings...</h4>
            case "error":
                return <h4>{bookStore.candBookDataError}</h4>
            case "fulfilled":
                return (
                    <div>
                        {bookStore.displayBookData && <Table 
                                                        columns={this.generateColumns()} 
                                                        dataSource={bookStore.displayBookData} 
                                                        pagination={false} 
                                                        bordered/>}
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

export default Planner