import React, { Component } from 'react'
import { withFormik, Form, Field } from 'formik'
import { Input } from 'antd'



const CandForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    handleChange
}) => (
    <Form>
        <div>
            { touched.email && errors.email && <p>{errors.email}</p> }
            <Input type="text" name="forename" placeholder="Forename" value={values.forename} onChange={handleChange} />
            <Field type="text" name="forename" placeholder="Forename"/>
        </div>
        <div>
            { touched.password && errors.password && <p>{errors.password}</p> }
            <Field type="text" name="surname" placeholder="Surname"/>
        </div>
        <div>
            { touched.email && errors.email && <p>{errors.email}</p> }
            <Field type="text" name="phone" placeholder="Phone Number"/>
        </div>
        <div>
            { touched.password && errors.password && <p>{errors.password}</p> }
            <Field type="text" name="postcode" placeholder="Postcode"/>
        </div>
        <Field component="select" name="status">
            <option value="RAW">Raw</option>
            <option value="LIVE">Live</option>
            <option value="PLAC">Placed</option>
            <option value="FOJ">Found Own Job</option>
        </Field>
        <Field component="select" name="consultant">
            <option value="Undefined">Undefined</option>
            <option value="AP">Andrew Popplestone</option>
            <option value="GE">Glenn Eve</option>
            <option value="MO">Mo Islam</option>
            <option value="Phil">Phil</option>
        </Field>
        <Field component="select" name="role">
            <option value="ADM">Administrator</option>
            <option value="IT">IT Consultant</option>
            <option value="HGV">HGV Driver</option>
            <option value="LGV">LGV Driver</option>
        </Field>
        <button disabled={isSubmitting}>Submit</button>
    </Form>
)


const FormikCandForm = withFormik({
    mapPropsToValues({ data }) {
        let { email, password, forename, surname, status, phone, consultant, role, postcode } = data
        if(consultant === null) {
            consultant = {}
            consultant.name = "Undefined"
        }
        return {
          email: email || '',
          password: password || '',
          forename: forename || '',
          surname: surname || '',
          status: status || 'LIVE',
          phone: phone || '',
          consultant: consultant.name || '',
          role: role || '',
          postcode: postcode || ''
        }
      },
})(CandForm)

export default FormikCandForm