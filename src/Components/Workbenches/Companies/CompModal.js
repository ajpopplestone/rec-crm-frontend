import React, { Component } from 'react'
import { observer, inject } from "mobx-react"
import { Modal, Tabs, Button } from 'antd'
import moment from 'moment'

import CompanyForm from './CompanyForm'

import BookingsTable from '../../UI/BookingsTable'
import BookingForm from '../Bookings/BookingForm'


const TabPane = Tabs.TabPane

@inject('compStore', 'bookStore')
@observer
class CompModal extends Component {
    state = {
        activeKey: "1"
    }  
    
    displayBookings() {
        const { compStore, bookStore } = this.props
        if(bookStore.openBook) {
            return (
                <div className="FormInFormDiv">
                    <BookingForm 
                                data={bookStore.openBook} 
                                handleSave={bookStore.saveBook}
                                handleDelete={bookStore.deleteBooking} 
                                setSaveState={bookStore.setSaveState}
                                refreshBookings={compStore.fetchCompBookings}
                                handleCancel={() => bookStore.setOpenBook(null)}/>
                </div>
            )
        } else if (compStore.openComp && compStore.openComp.id) {
            const newCompData = {
                id: 'new',
                comp: {
                    id: compStore.openComp.id,
                    name: compStore.openComp.name,
                  }
            }
            return (
                <div>
                    <div className="BookTableHeader">
                        <Button className="BookingsRefresh" type="primary" onClick={compStore.fetchCompBookings}>Refresh</Button>
                        <Button className="BookingsNew" type="secondary" onClick={() => bookStore.setOpenBook(newCompData)}>New</Button>
                    </div>
                    <BookingsTable data={compStore.openBookings} type={'company'}/>
                </div>
            )
        }
    } 
    
    handleCancel = () => {
        const { compStore, bookStore } = this.props
        compStore.setOpenComp(null)
        bookStore.setOpenBook(null)
        this.setState({activeKey: "1"})
    }
    
    render() {
        const { compStore } = this.props

        return (           
            <Modal
                title="Company Details"
                footer={null}
                visible={compStore.openComp ? true : false }
                onCancel={this.handleCancel}>
                    <Tabs activeKey={this.state.activeKey} onChange={(activeKey) => this.setState({activeKey})}>
                        <TabPane tab="Profile" key="1">
                            { compStore.openComp && <CompanyForm 
                                    data={compStore.openComp} 
                                    handleSave={compStore.saveComp}
                                    handleDelete={compStore.deleteCompany} 
                                    setSaveState={compStore.setSaveState}
                                    handleCancel={this.handleCancel}/> }
                        </TabPane>
                        <TabPane tab="Bookings" key="2">
                            {
                                this.displayBookings()
                            } 
                        </TabPane>
                        <TabPane tab="Info" key="3">
                            {compStore.openComp && compStore.openComp.id && 
                            <div>
                                <div className='infoDiv'>
                                    <p>Updated By - <strong>{compStore.openComp.updatedBy.name}</strong> on {moment(compStore.openComp.updatedAt).format("dddd, Do MMMM YYYY, h:mm:ss a")}</p>
                                    <p>created By - <strong>{compStore.openComp.createdBy.name}</strong> on {moment(compStore.openComp.createdAt).format("dddd, Do MMMM YYYY, h:mm:ss a")}</p>
                                </div>
                                <div className='UIDDiv'>
                                    <p>UID - {compStore.openComp.id}</p>
                                </div>
                            </div>}
                        </TabPane>
                    </Tabs>
            </Modal>
        )
    }
}

export default CompModal