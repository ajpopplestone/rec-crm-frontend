import React, { Component } from 'react'
import { withFormik, Form } from 'formik'
import { Input, Form as AntForm, Button, Icon, Modal } from 'antd'
import { Query } from "react-apollo"

import InputSelect from '../../UI/InputSelect'

import { GET_ALL_USERS } from '../../../queries/userQueries'
import { createCodeQuery } from '../../../queries/codeQueries'

const formLayout = [
    { 
        value: "name",
        label: "Name",
        type: "text"
    }, {
        value: "website",
        label: "Website",
        type: "text"
    }, {
        value: "email",
        label: "Email",
        type: "text"
    }, {
        value: "phone",
        label: "Phone",
        type: "text"
    }, {
        value: "postcode",
        label: "Postcode",
        type: "text"
    }
]

const formItemLayout = {
    labelCol: {
      xs: { span: 5 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }

class CompForm extends Component {
    state = {
        confirmDelete: false
    }

    handleSave(type) {
        this.props.setSaveState(type)
        this.props.handleSubmit()
    }

    openConfirmDelete = () => {
        this.setState({confirmDelete: true})
    }

    closeConfirmDelete = () => {
        this.setState({confirmDelete: false})
    }
    
    createInputs() {
        const { values, errors, touched, handleChange } = this.props

        return formLayout.map(element => {
            return (
                <AntForm.Item label={element.label} {...formItemLayout} key={element.label}>
                    { touched[element.value] && errors[element.value] && <p>{errors[element.value]}</p> }
                    <Input type={element.type} name={element.value} placeholder={element.label} value={values[element.value]} onChange={handleChange} />
                </AntForm.Item>
            )
        })
    }

    render() {
        const { values, setFieldValue, handleCancel, handleDelete } = this.props

        return (
            <Form>
                {this.createInputs()}
                <Query query={GET_ALL_USERS} variables={null}>
                    {({ loading, error, data}) => {
                        // if (loading) return null;
                        if (error) return `Error!: ${error}`;
        
                        return (
                            <AntForm.Item label="Consultant" {...formItemLayout}>
                                {loading ? 
                                    <div>Loading</div> :
                                    <InputSelect options={data.users} name="consultant" value={values.consultant} setFieldValue={setFieldValue}/>}
                            </AntForm.Item>
                        );
                    }}
                </Query>
                <Query query={createCodeQuery('compStatuses')}>
                    {({ loading, error, data}) => {
                        // if (loading) return null;
                        if (error) return `Error!: ${error}`;
        
                        return (
                            <AntForm.Item label="Status" {...formItemLayout}>
                                {loading ? 
                                    <div>Loading</div> :
                                    <InputSelect options={data['compStatuses']} name="status" value={values.status} setFieldValue={setFieldValue}/>}
                            </AntForm.Item>
                        );
                    }}
                </Query>
                <Query query={createCodeQuery('busTypes')}>
                    {({ loading, error, data}) => {
                        // if (loading) return null;
                        if (error) return `Error!: ${error}`;
        
                        return (
                            <AntForm.Item label="Business Type" {...formItemLayout}>
                                {loading ? 
                                    <div>Loading</div> : 
                                    <InputSelect options={data['busTypes']} name="businessType" value={values.businessType} setFieldValue={setFieldValue}/>}
                            </AntForm.Item>
                        );
                    }}
                </Query>
                <Button onClick={() => this.handleSave("OK")} type="primary">OK</Button>
                <Button onClick={() => this.handleSave("APPLY")} >Apply</Button>
                <Button onClick={this.openConfirmDelete} style={{float: "right"}}><Icon type="delete"/></Button>
                <Button onClick={handleCancel} style={{float: "right"}}>Cancel</Button>
                <Modal
                    title="Confirm Delete"
                    visible={this.state.confirmDelete}
                    onOk={handleDelete}
                    onCancel={this.closeConfirmDelete}
                    className={'deleteModal'}>
                    <p>Do you wish to delete this record</p>
                    <p>This cannot be restored</p>
                </Modal>
            </Form>
        )
    }
}


const FormikCompForm = withFormik({
    mapPropsToValues({ data }) {
        let { email, name, status, phone, consultant, businessType, postcode, website } = data
        
        if(!consultant) {
            consultant = {}
            consultant.id = ""
        }
        if(!businessType) {
            businessType = {}
            businessType.shortCode = ""
        }
        if(!status) {
            status = {}
            status.shortCode = ""
        }
        return {
          email: email || '',
          name: name || '',
          website: website || '',
          status: status.shortCode || '',
          phone: phone || '',
          consultant: consultant.id || '',
          businessType: businessType.shortCode || '',
          postcode: postcode || ''
        }
      },
    handleSubmit(values, { props: { handleSave } }) {
        // console.log(values)

        handleSave(values)
    }
})(CompForm)

export default FormikCompForm