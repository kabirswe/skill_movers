import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import configureStore from '../store';
import { Footer, MainRoute, Navbar } from '../components/index';

import '../styles/common.scss';
import './static/style.scss';

const store = configureStore();
const persistor = persistStore(store);

// Main Components
export class App extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    demoAsyncCall().then(() => this.setState({ loading: false }));
  }
  render() {
    const { loading } = this.state;
    
    if(loading) { return null; }
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div className="app">
            <BrowserRouter>
              <MainRoute />
              {/* <Footer /> */}
            </BrowserRouter>
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

const demoAsyncCall = () => {
  return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}
