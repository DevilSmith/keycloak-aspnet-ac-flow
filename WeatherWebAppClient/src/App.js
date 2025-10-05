import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { withKeycloak } from '@react-keycloak/web';

class App extends Component {
  static displayName = App.name;

  render() {
    const { keycloak, keycloakInitialized } = this.props;

    if (!keycloakInitialized) {
      return <div>Loading...</div>;
    }

    if (!keycloak.authenticated) {
      return (
        <div>
          <button onClick={() => keycloak.login()}>Войти через Keycloak</button>
        </div>
      );
    }

    return (
      <Layout>
        <div style={{ float: 'right', margin: 10 }}>
          Привет, {keycloak.tokenParsed?.preferred_username}
          <button style={{ marginLeft: 10 }} onClick={() => keycloak.logout()}>
            Выйти
          </button>
        </div>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    );
  }
}

export default withKeycloak(App);