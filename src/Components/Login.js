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
            </div>
        )
    }
}

const FormikLogin = withFormik({
    mapPropsToValues() {
        return {
            email: 'bob@example.com',
            password: 'red12345'
        }
    },
    handleSubmit(values, { props: { login } }) {
        // console.log(values)
        login(values)
    }
})(Login)

export default FormikLogin