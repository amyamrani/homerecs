import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import APIContext from '../APIContext';
import Nav from '../Nav/Nav';
import LandingPage from '../LandingPage/LandingPage';
import Dashboard from '../Dashboard/Dashboard';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import AddProductPage from '../AddProductPage/AddProductPage';
import EditProductPage from '../EditProductPage/EditProductPage';
import AddGroupPage from '../AddGroupPage/AddGroupPage';
import JoinGroupPage from '../JoinGroupPage/JoinGroupPage';
import EditGroupPage from '../EditGroupPage/EditGroupPage';
import GroupPage from '../GroupPage/GroupPage';
import UserPage from '../UserPage/UserPage';
import Footer from '../Footer/Footer';
import './App.css';
import ErrorBoundary from '../ErrorBoundary';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: undefined,
    }
  }

  componentDidMount() {
    const authToken = localStorage.getItem('authToken');
    this.setState({ isLoggedIn: authToken ? true : false });
  }

  login = (user) => {
    localStorage.setItem('authToken', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    this.setState({ isLoggedIn: true, user: user });
  }

  signup = (user) => {
    localStorage.setItem('authToken', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    this.setState({ isLoggedIn: true, user: user });
  }

  logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.setState({ isLoggedIn: false, user: undefined });
  }

  render() {
    const contextValue = {
      login: this.login,
      logout: this.logout,
      signup: this.signup,
      isLoggedIn: this.state.isLoggedIn,
    }

    return (
      <APIContext.Provider value={contextValue}>
        <div className='app'>
          <Nav />

          <main>
            <ErrorBoundary>
              <Switch>
                <Route
                  exact path='/'
                  component={LandingPage}
                />

                <Route
                  exact path='/login'
                  component={LoginPage}
                />

                <Route
                  exact path='/signup'
                  component={SignupPage}
                />

                <Route
                  exact path='/dashboard'
                  component={Dashboard}
                />

                <Route
                  exact path='/products/new'
                  component={AddProductPage}
                />

                <Route
                  exact path='/products/:id/edit'
                  render={(routerProps) => {
                    const id = routerProps.match.params.id;

                    return <EditProductPage id={id} />
                  }}
                />

                <Route
                  exact path='/groups/new'
                  component={AddGroupPage}
                />

                <Route
                  exact path='/groups/join'
                  component={JoinGroupPage}
                />

                <Route
                  exact path='/groups/:id'
                  render={(routerProps) => {
                    const groupId = routerProps.match.params.id;

                    return <GroupPage groupId={groupId} />
                  }}
                />

                <Route
                  exact path='/groups/:id/edit'
                  render={(routerProps) => {
                    const groupId = routerProps.match.params.id;
                    return <EditGroupPage groupId={groupId} />
                  }}
                />

                <Route
                  exact path='/users/:id'
                  render={(routerProps) => {
                    const id = routerProps.match.params.id;

                    return <UserPage userId={id} />
                  }}
                />
              </Switch>
            </ErrorBoundary>
          </main>

          <Footer />
        </div>
      </APIContext.Provider>
    );
  }
}

export default App;