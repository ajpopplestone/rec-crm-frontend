import React from 'react';
import ReactDOM from 'react-dom';
// import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { LocaleProvider } from 'antd';
import locales from 'antd/lib/locale-provider/en_GB';
import { Provider } from 'mobx-react';

import Store from './stores/store'
import CandStore from './stores/candStore'
import CompStore from './stores/compStore'
import BookStore from './stores/bookStore'

import { startRouter } from './stores/router' 

// import getClient from './utils/getClient'

import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
    // uri: 'http://localhost:4000'
    uri: 'https://peaceful-savannah-69762.herokuapp.com/'
  })

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('AUTH_TOKEN')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  } 

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    // link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions
  });
  
  const stores = {
    store: new Store(client),
    candStore: new CandStore(client),
    compStore: new CompStore(client),
    bookStore: new BookStore(client),
  }
  
startRouter(stores)


const app = (
        <LocaleProvider locale={locales}>
            <ApolloProvider client={client}>
                <Provider {...stores}>
                    <App/>
                </Provider>
            </ApolloProvider>
        </LocaleProvider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
