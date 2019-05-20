import React, { Component } from 'react';
import RecApp from './RecApp'
import FormikLogin from './Login'
import { observer, inject } from "mobx-react"
import './App.css';
import 'antd/dist/antd.css'

@inject('store', 'candStore', 'compStore', 'bookStore')
@observer
class App extends Component {
  login = (values) => {
    const { candStore, compStore, bookStore, store } = this.props
    let callback = null

    if(store.workbench === 'candidates') {
      callback = candStore.fetchCandidateData
    } else if (store.workbench === 'companies') {
      callback = compStore.fetchCompaniesData
    } else if (store.workbench === 'bookings') {
      callback = bookStore.fetchBookingData
    } 

    store.login(values, callback)
  }

  render() {
    const { currentUser } = this.props.store
    return (
      <div>
        {!currentUser ? <FormikLogin login={this.login}/> : <RecApp />}
      </div>
    );
  }
}
    
export default App;
