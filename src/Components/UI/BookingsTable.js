import React, { Component } from 'react'
import { observer, inject } from "mobx-react"
import { Table } from 'antd'
import { toJS } from 'mobx';
import moment from 'moment'
import columns from '../../utils/bookingColumns'


@inject('bookStore')
@observer
class BookingsTable extends Component {
    addColumns() {
        const { type } = this.props
        if(type === 'company') {
            return columns.company
        }
        if(type === 'candidate') {
            return columns.candidates
        }
        return null
    }

    onRow = (record, rowIndex) => {
        const booking = {id: record.id}

        return {
            onClick: () => {this.props.bookStore.setOpenBook(booking)}
          }
    }

    createDatasource(type) {
        const { data } = this.props
        if(data) {
            // console.log(toJS(data))
            const bookings = []
                for (let booking of toJS(data)) {
                    let currentBook = {}
                    currentBook.key = booking.id
                    for (let key in booking) {
                        switch (key) {
                            case 'company':
                                currentBook.company = booking.company ? booking.company.name : null
                                break
                            case 'candidate':
                                currentBook.candidate = booking.candidate ? `${booking.candidate.forename} ${booking.candidate.surname}` : null
                                currentBook.forename = booking.candidate ? `${booking.candidate.forename}` : null
                                currentBook.surname = booking.candidate ? `${booking.candidate.surname}` : null
                                break
                            case 'date':
                                currentBook.date = booking.date ? moment(booking.date).format("dddd, Do MMMM YYYY") : null
                                break
                            case 'role':
                                currentBook.role = booking.role ? booking.role.description : null
                                break
                            default:
                                currentBook[key] = booking[key]
                        }                        
                    }
                    bookings.push(currentBook)
                }
                // console.log(bookings)
                return bookings       
            }
        return null
    }

    render() {
        // console.log(this.props.data)
        return (
            <Table dataSource={this.createDatasource()} columns={this.addColumns()} onRow={this.onRow}/>
        )
    }
}

export default BookingsTable