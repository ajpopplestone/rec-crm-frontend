import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { observer, inject } from "mobx-react"
import Workbench from './Workbench'

const {
  Header, Footer, Sider, Content,
} = Layout;

@inject("store", 'candStore', 'compStore', 'bookStore')
@observer
class RecApp extends Component {
  state = {
    collapsed: false,
  }
  
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  workbenchClickHandler = (type) => {
    const { store, candStore, bookStore, compStore } = this.props

    store.setWorkbench(type)

    switch(type) {
      case 'candidates':
        candStore.fetchCandidateData()
        break;
      case 'companies':
        compStore.fetchCompaniesData()
        break;
      case 'bookings':
        bookStore.fetchBookingData()
        break;
      default:
        console.log('Invalid workbench')
    }
  }
   
  render() {
    const { store } = this.props
    return (
      <div className="App">
        <Layout>
          <Sider 
            style={{ overflow: 'hidden', background: '#fff', height: '92vh' }}
            width={200}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            >
            <div 
              style={{height: '60px', background: '#F5D4D3', fontSize: '2.5em', textAlign: 'center'}}>
              <Icon type="idcard" />
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={[store.workbench]}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
            <Menu.Item key="candidates" onClick={() => this.workbenchClickHandler('candidates')}><Icon type="user" /><span>Candidates</span></Menu.Item>
            <Menu.Item key="companies" onClick={() => this.workbenchClickHandler('companies')}><Icon type="profile" /><span>Companies</span></Menu.Item>
            <Menu.Item key="bookings" onClick={() => this.workbenchClickHandler('bookings')}><Icon type="team" /><span>Bookings</span></Menu.Item>
              {
                // <Menu.Item key="home" onClick={this.homeClickHandler}><Icon type="idcard" /><span>Home</span></Menu.Item>
                // <Menu.Item key="admin" onClick={() => store.setWorkbench('admin')}><Icon type="edit" /><span>Admin</span></Menu.Item>
              }
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{ background: 'red', height: '60px', padding: 0, textAlign: 'left' }}
              >
              <Icon
                style={{fontSize: '18px', lineHeight: '64px', padding: '0 24px', cursor: 'pointer', transition: 'color .3s'}}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <span className="logout" onClick={store.logout}>Logout</span>
            </Header>
            <Content 
              style={{ overflow: 'hidden', paddingBottom: '50px'}}
              >
              <Workbench workbench={store.workbench} />
            </Content>
          </Layout>     
          <Footer 
            className="footer"
            style={{ background: '#F5D4D3', height: '40px' }}>Recruitment Software (C) 2019</Footer>
        </Layout>
      </div>
    );
  }
}

export default RecApp;
