import React, { Component } from 'react'
import { withFormik, Form } from 'formik'
import { Form as AntForm, Button, Icon, Modal, DatePicker } from 'antd'
import { Query } from "react-apollo"

import moment from 'moment'

import InputSelect from '../../UI/InputSelect'
import AutoCompleteSearch from '../../UI/AutoCompleteSearch'

import { CANDIDATE_SHORT_SEARCH } from '../../../queries/candidateQueries'
import { COMPANY_SHORT_SEARCH } from '../../../queries/companyQueries'
// import { GET_ALL_USERS } from '../../../queries/userQueries'
import { createCodeQuery } from '../../../queries/codeQueries'

import * as Yup from 'yup'
// import bookStore from '../../../stores/bookStore';



const formItemLayout = {
    labelCol: {
      xs: { span: 4 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }

class BookForm extends Component {
    state = {
        confirmDelete: false
    }

    handleSave(type) {
        this.props.setSaveState(type)
        this.props.handleSubmit()
    }

    handleDelete = () => {
        if(!this.props.refreshBookings) {
            this.props.handleDelete()
        } else {
            this.props.handleDelete(this.props.refreshBookings)
        }
    }

    openConfirmDelete = () => {
        this.setState({confirmDelete: true})
    }

    closeConfirmDelete = () => {
        this.setState({confirmDelete: false})
    }
    
    getCandDefaultValue = (value) => {
        const { data } = this.props
        if (value === '') {
            return ''
        } else {
            return `${data.candidate.forename} ${data.candidate.surname}`
        }
    }

    getCompDefaultValue = (value) => {
        const { data } = this.props
        if (value === '') {
            return ''
        } else {
            return data.company.name
        }
    }
            
    render() {
        const { values, setFieldValue, handleCancel, errors } = this.props
        // console.log(values)
        // console.log(errors)
                
        return (
            <Form>
                <AntForm.Item label="Candidate" {...formItemLayout}>
                    <AutoCompleteSearch 
                        type = "candidates"
                        query = {CANDIDATE_SHORT_SEARCH}
                        setFieldValue={setFieldValue}
                        placeholder="Type to search..."
                        value = {values.candidate}
                        defaultValue = {this.getCandDefaultValue(values.candidate)}
                        name="candidate"/>
                </AntForm.Item>
                <AntForm.Item label="Company" {...formItemLayout}>
                    <AutoCompleteSearch 
                        type = "companies"
                        query = {COMPANY_SHORT_SEARCH}
                        setFieldValue={setFieldValue}
                        placeholder="Type to search..."
                        value = {values.company}
                        defaultValue = {this.getCompDefaultValue(values.company)}
                        name="company"/>
                </AntForm.Item>
                <Query query={createCodeQuery('candRoles')}>
                    {({ loading, error, data}) => {
                        // if (loading) return null;
                        if (error) return `Error!: ${error}`;
        
                        return (
                            <AntForm.Item label="Role" {...formItemLayout}>
                                {loading ? 
                                    <div>Loading</div> : 
                                    <InputSelect options={data['candRoles']} name="role" value={values.role} setFieldValue={setFieldValue}/>}
                            </AntForm.Item>
                        );
                    }}
                </Query>
                <AntForm.Item label="Date" {...formItemLayout}>
                    <DatePicker 
                        defaultValue={values.date} 
                        placeholder={moment().format('DD/MM/YYYY')} 
                        format='DD/MM/YYYY'
                        onChange={(date) => setFieldValue('date', date)}/>
                </AntForm.Item>
                <div className='errors'>
                    <p>{errors.date}</p>
                    <p>{errors.candidate}</p>
                    <p>{errors.company}</p>
                    <p>{errors.role}</p>
                    <p>{this.props.bookingError}</p>
                </div>
                <Button onClick={() => this.handleSave("OK")} type="primary">OK</Button>
                <Button onClick={() => this.handleSave("APPLY")} >Apply</Button>
                <Button onClick={this.openConfirmDelete} style={{float: "right"}}><Icon type="delete"/></Button>
                <Button onClick={handleCancel} style={{float: "right"}}>Cancel</Button>
                <Modal
                    title="Confirm Delete"
                    visible={this.state.confirmDelete}
                    onOk={this.handleDelete}
                    onCancel={this.closeConfirmDelete}
                    className={'deleteModal'}>
                    <p>Do you wish to delete this record</p>
                    <p>This cannot be restored</p>
                </Modal>
            </Form>
        )
    }
}


const FormikBookForm = withFormik({
    mapPropsToValues({ data }) {
        let { candidate, company, role, date } = data
        
        candidate.name = `${candidate.forename} ${candidate.surname}`
        let dateMoment = null
        if(moment.isMoment(date)){
            dateMoment = date
        } else if (date === '') {
            dateMoment = moment()
        } else {
            dateMoment = moment(date)
        }
        // console.log(dateMoment)

        return {
            company: company.id || '',
            candidate: candidate.id || '',
            role: role.shortCode || '',
            date: dateMoment
        }
      },
    validationSchema: Yup.object().shape({
        company: Yup.string('Company is required').typeError('Company is required').required('Company is required'),
        candidate: Yup.string().typeError('Candidate is required').required('Candidate is required'),
        date: Yup.date('Date is required').typeError("Invalid date").transform(function(value, originalValue) {
            if (this.isType(value)) return value;
            // the default coercion transform failed so lets try it with Moment instead
            value = moment(originalValue, ['MMM dd, yyy']);
            // console.log(new Date(''))
            return value.isValid() ? value.toDate() : new Date('');
          }).required('Date is required'),
        role: Yup.string().typeError('Role is required').required('Role is required')
    }),
    handleSubmit(values, { props: { handleSave, refreshBookings } }) {
        // console.log(values)

        if(!refreshBookings) {
            handleSave(values)
        } else {
            handleSave(values, refreshBookings)
        }
    }
})(BookForm)

export default FormikBookForm