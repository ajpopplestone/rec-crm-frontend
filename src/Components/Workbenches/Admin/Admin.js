import React, { Component } from 'react'
import { observer, inject } from "mobx-react"
import { Modal, Tabs } from 'antd'
import moment from 'moment'

import SearchBar from '../../SearchBar'
import CandidatesTable from './CandidatesTable'
// import CandidateForm from '../Candidates/CandidateForm'


const TabPane = Tabs.TabPane

@inject('adminStore')
@observer
class Admin extends Component {
        
    render() {
        const { adminStore } = this.props

        return (
            <div>
                <Modal
                    title="Candidate Details"
                    footer={null}
                    visible={adminStore.openCand ? true : false }
                    onCancel={() => adminStore.setOpenCand(null)}>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="Profile" key="1">
                                { adminStore.openCand && <CandidateForm 
                                        data={adminStore.openCand} 
                                        handleSave={adminStore.saveCand}
                                        handleDelete={adminStore.deleteCandidate} 
                                        setSaveState={adminStore.setSaveState}
                                        handleCancel={() => adminStore.setOpenCand(null)}/> }
                            </TabPane>
                            <TabPane tab="Login" key="2">
                                Login Tab
                            </TabPane>
                            <TabPane tab="Misc" key="3">
                                {
                                //     adminStore.openCand && adminStore.openCand.id && <div>
                                //     <p>Updated By - <strong>{adminStore.openCand.updatedBy.name}</strong> on {moment(adminStore.openCand.updatedAt).format("dddd, Do MMMM YYYY, h:mm:ss a")}</p>
                                //     <p>created By - <strong>{adminStore.openCand.createdBy.name}</strong> on {moment(adminStore.openCand.createdAt).format("dddd, Do MMMM YYYY, h:mm:ss a")}</p>
                                // </div>
                            }
                            </TabPane>
                        </Tabs>
                </Modal>
            </div>
        )
    }
}

export default Admin