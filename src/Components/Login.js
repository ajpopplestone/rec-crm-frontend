import React, { Component } from 'react'
// import { observer, inject } from "mobx-react"
import { withFormik, Form } from 'formik'
import { Input, Form as AntForm, Button } from 'antd'
// import * as Yup from 'yup'


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


class Login extends Component {
    render() {
        const { values, handleChange, handleSubmit } = this.props
        return (
            <div>
                <div className="background"/>
                <div className="login">
                    <Form>
                        <AntForm.Item label="Email" {...formItemLayout}>
                            <Input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
                        </AntForm.Item>
                        <AntForm.Item label="Password" {...formItemLayout}>
                            <Input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
                        </AntForm.Item>
                        <Button type="primary" onClick={handleSubmit}>Login</Button>
                    </Form>
                    <p className="loginDetails"><strong>Guest login: </strong>guest@example.com <strong>Password: </strong> green12345</p>
                </div>
                <div className="loginInfo">
                    <p><strong>GitHub:</strong></p>
                    <p>Frontend: https://github.com/ne4rly0ne/rec-crm-frontend</p>
                    <p>Backend: https://github.com/ne4rly0ne/rec-crm-backend</p>
                </div>
            </div>
        )
    }
}

const FormikLogin = withFormik({
    mapPropsToValues() {
        return {
            email: '',
            password: ''
        }
    },
    handleSubmit(values, { props: { login } }) {
        // console.log(values)
        login(values)
    }
})(Login)

export default FormikLogin