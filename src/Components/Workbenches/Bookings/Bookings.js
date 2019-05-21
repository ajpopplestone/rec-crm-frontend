import React, { Component } from 'react'
import { observer, inject } from "mobx-react"
import { Modal, Tabs } from 'antd'
import moment from 'moment'

// import SearchBar from '../../SearchBar'
import DaySelect from './DaySelect'
import Planner from './Planner'
import BookingForm from './BookingForm'


const TabPane = Tabs.TabPane

@inject('candStore', 'bookStore')
@observer
class Bookings extends Component {
        
    render() {
        const { candStore, bookStore } = this.props
        console.log(this.props)
        // console.log('bookings workbench')
        // console.log(bookStore.plannerStart)
        // console.log(bookStore.plannerDays)
        // console.log(bookStore.openBook)
        return (
            <div>
                <DaySelect />
                <Planner />
                <Modal
                    title="Booking Details"
                    footer={null}
                    visible={bookStore.openBook && !candStore.openCand ? true : false }
                    onCancel={() => bookStore.setOpenBook(null)}>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="Profile" key="1">
                                { bookStore.openBook && <BookingForm 
                                        data={bookStore.openBook} 
                                        handleSave={bookStore.saveBook}
                                        handleDelete={bookStore.deleteBooking} 
                                        setSaveState={bookStore.setSaveState}
                                        handleCancel={() => bookStore.setOpenBook(null)}
                                        bookingError={bookStore.bookingError}/> }
                            </TabPane>
                            <TabPane tab="Info" key="2">
                                {bookStore.openBook && bookStore.openBook.id && 
                                <div>
                                    <div className='infoDiv'>
                                        <p>Updated By - <strong>{bookStore.openBook.updatedBy.name}</strong> on {moment(bookStore.openBook.updatedAt).format("dddd, Do MMMM YYYY, h:mm:ss a")}</p>
                                        <p>created By - <strong>{bookStore.openBook.createdBy.name}</strong> on {moment(bookStore.openBook.createdAt).format("dddd, Do MMMM YYYY, h:mm:ss a")}</p>
                                    </div>
                                    <div className='UIDDiv'>
                                        <p>UID - {bookStore.openBook.id}</p>
                                    </div>
                                </div>}
                            </TabPane>
                        </Tabs>
                </Modal>
            </div>
        )
    }
}

export default Bookings