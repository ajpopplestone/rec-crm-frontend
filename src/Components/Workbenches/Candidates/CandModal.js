import React, { Component } from 'react'
import { observer, inject } from "mobx-react"
import { Modal, Tabs, Button } from 'antd'
import moment from 'moment'

import CandidateForm from '../Candidates/CandidateForm'
import BookingForm from '../Bookings/BookingForm'

import BookingsTable from '../../UI/BookingsTable'


const TabPane = Tabs.TabPane

@inject('candStore', 'bookStore')
@observer
class CandModal extends Component {
    state = {
        activeKey: "1"
    }

    displayBookings() {
        const { candStore, bookStore } = this.props
        if(bookStore.openBook) {
            return (
                <div className="FormInFormDiv">
                    <BookingForm 
                                data={bookStore.openBook} 
                                handleSave={bookStore.saveBook}
                                handleDelete={bookStore.deleteBooking} 
                                setSaveState={bookStore.setSaveState}
                                refreshBookings={candStore.fetchCandBookings}
                                handleCancel={() => bookStore.setOpenBook(null)}/>
                </div>
            )
        } else if (candStore.openCand && candStore.openCand.id) {
            const newCandData = {
                id: 'new',
                cand: {
                    id: candStore.openCand.id,
                    forename: candStore.openCand.forename,
                    surname: candStore.openCand.surname
                  }
            }
            return (
                <div>
                    <div className="BookTableHeader">
                        <Button className="BookingsRefresh" type="primary" onClick={candStore.fetchCandBookings}>Refresh</Button>
                        <Button className="BookingsNew" type="secondary" onClick={() => bookStore.setOpenBook(newCandData)}>New</Button>
                    </div>
                    <BookingsTable data={candStore.openBookings} type={'candidate'}/>
                </div>
            )
        }
    }   

    handleCancel = () => {
        const { candStore, bookStore } = this.props
        candStore.setOpenCand(null)
        bookStore.setOpenBook(null)
        this.setState({activeKey: "1"})
    }
    
    render() {
        const { candStore } = this.props
        return (
            <Modal
                title="Candidate Details"
                footer={null}
                visible={candStore.openCand ? true : false }
                onCancel={this.handleCancel}>
                    <Tabs activeKey={this.state.activeKey} onChange={(activeKey) => this.setState({activeKey})} >
                        <TabPane tab="Profile" key="1">
                            { candStore.openCand && <CandidateForm 
                                    data={candStore.openCand} 
                                    handleSave={candStore.saveCand}
                                    handleDelete={candStore.deleteCandidate} 
                                    setSaveState={candStore.setSaveState}
                                    handleCancel={this.handleCancel}/> }
                        </TabPane>
                        <TabPane tab="Bookings" key="2">
                            {
                                this.displayBookings()
                            }
                        </TabPane>
                        <TabPane tab="Info" key="3">
                            {
                                candStore.openCand && candStore.openCand.id && 
                            <div>
                                <div className='infoDiv'>
                                    <p>Updated By - <strong>{candStore.openCand.updatedBy.name}</strong> on {moment(candStore.openCand.updatedAt).format("dddd, Do MMMM YYYY, h:mm:ss a")}</p>
                                    <p>created By - <strong>{candStore.openCand.createdBy.name}</strong> on {moment(candStore.openCand.createdAt).format("dddd, Do MMMM YYYY, h:mm:ss a")}</p>
                                </div>
                                <div className='UIDDiv'>
                                    <p>UID - {candStore.openCand.id}</p>
                                </div>
                            </div>
                        }
                        </TabPane>
                    </Tabs>
            </Modal>
        )
    }
}

export default CandModal