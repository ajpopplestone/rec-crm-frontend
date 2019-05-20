import React, { Component } from 'react'
import { withFormik, Form } from 'formik'
import { Input, Form as AntForm, Button, Icon, Modal } from 'antd'
import { Query } from "react-apollo"

import InputSelect from '../../UI/InputSelect'

import { GET_ALL_USERS } from '../../../queries/userQueries'
import { createCodeQuery } from '../../../queries/codeQueries'

const formLayout = [
    { 
        value: "forename",
        label: "Forename",
        type: "text"
    }, {
        value: "surname",
        label: "Surname",
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
      xs: { span: 4 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }

class CandForm extends Component {
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

                        // console.log(data)
        
                        return (
                            <AntForm.Item label="Consultant" {...formItemLayout}>
                                {loading ? 
                                    <div>Loading</div> :
                                    <InputSelect options={data.users} name="consultant" value={values.consultant} setFieldValue={setFieldValue}/>}
                            </AntForm.Item>
                        );
                    }}
                </Query>
                <Query query={createCodeQuery('candStatuses')}>
                    {({ loading, error, data}) => {
                        // if (loading) return null;
                        if (error) return `Error!: ${error}`;
        
                        return (
                            <AntForm.Item label="Status" {...formItemLayout}>
                                {loading ? 
                                    <div>Loading</div> :
                                    <InputSelect options={data['candStatuses']} name="status" value={values.status} setFieldValue={setFieldValue}/>}
                            </AntForm.Item>
                        );
                    }}
                </Query>
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


const FormikCandForm = withFormik({
    mapPropsToValues({ data }) {
        let { email, forename, surname, status, phone, consultant, role, postcode } = data
        
        if(!consultant) {
            consultant = {}
            consultant.id = ""
        }
        if(!role) {
            role = {}
            role.shortCode = ""
        }
        if(!status) {
            status = {}
            status.shortCode = ""
        }
        return {
          email: email || '',
          forename: forename || '',
          surname: surname || '',
          status: status.shortCode || '',
          phone: phone || '',
          consultant: consultant.id || '',
          role: role.shortCode || '',
          postcode: postcode || ''
        }
      },
    handleSubmit(values, { props: { handleSave } }) {
        console.log(values)

        handleSave(values)
    }
})(CandForm)

export default FormikCandForm