import React, { Component } from 'react'
import { observer, inject } from "mobx-react"
import { DatePicker, Row, Col, Button } from 'antd'
import moment from 'moment'

import SearchBar from '../../SearchBar'



@inject('bookStore')
@observer
class DaySelect extends Component {    
    handleAddDays(value) {
        const { bookStore } = this.props
        const newDay = bookStore.plannerStart.clone().add(value, 'days')
        bookStore.setPlannerStart(newDay)
    }

    handleSubDays(value) {
        const { bookStore } = this.props
        const newDay = bookStore.plannerStart.clone().subtract(value, 'days')
        bookStore.setPlannerStart(newDay)
    }

    handleSetThisWeek = () => {
        const { bookStore } = this.props
        const newDay = moment().startOf('isoWeek')
        bookStore.setPlannerStart(newDay)
    }

    render() {
        const { bookStore } = this.props
        const styles = {
            color: '#08c',
        }
        const styleRight = {
            float: 'right'
        }
        const dateFormat = 'DD/MM/YYYY'
        return (
            <div className="daySelect">
                <Row>
                    <Col span={2}>
                        <Button icon="double-left" style={styles} onClick={() => this.handleSubDays(7)}/>
                        <Button icon="left" style={styles} onClick={() => this.handleSubDays(1)}/>
                    </Col>
                    <Col span={14}>
                        <SearchBar 
                            newRecord={() => bookStore.setOpenBook({id: 'new'})} 
                            updateSearchTerms={bookStore.updateSearchTerms}
                            fetchData={bookStore.fetchBookingData}
                        />
                    </Col>
                    <Col span={6}>
                        <div style={{width: '400px', margin: 'auto'}}>
                            <span>Week Start: </span>
                            <DatePicker 
                                defaultValue={bookStore.plannerStart} 
                                placeholder={bookStore.plannerStart.format(dateFormat)} 
                                format={dateFormat} 
                                onChange={bookStore.setPlannerStart}/>
                            <Button icon="home" onClick={this.handleSetThisWeek}/>
                        </div>
                    </Col>
                    <Col span={2}>
                        <Button icon="double-right" style={{...styles, ...styleRight}} onClick={() => this.handleAddDays(7)}/>
                        <Button icon="right" style={{...styles, ...styleRight}} onClick={() => this.handleAddDays(1)}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DaySelect