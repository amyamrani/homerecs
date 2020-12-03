import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import APIContext from '../APIContext';
import Nav from '../Nav/Nav';
import LandingPage from '../LandingPage/LandingPage';
import Dashboard from '../Dashboard/Dashboard';
import SignupPage from '../SignupPage/SignupPage';
import AddProductPage from '../AddProductPage/AddProductPage';
import EditProductPage from '../EditProductPage/EditProductPage';
import AddGroupPage from '../AddGroupPage/AddGroupPage';
import EditGroupPage from '../EditGroupPage/EditGroupPage';
import GroupPage from '../GroupPage/GroupPage';
import UserPage from '../UserPage/UserPage';
import Footer from '../Footer/Footer';
import './App.css';
import STORE from '../store';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: STORE.products,
      groups: STORE.groups,
    }
}

  addProduct = (product) => {
    this.setState({ products: [...this.state.products, product] });
  }

  editProduct = (product) => {
    const newProducts = this.state.products.map(p => p.id === product.id ? product : p);
    this.setState({ products: newProducts });
  }

  deleteProduct = (id) => {
    const newProducts = this.state.products.filter(p => p.id !== id);
    this.setState({ products: newProducts });
  }

  addGroup = (group) => {
    this.setState({ groups: [...this.state.groups, group] });
  }

  editGroup = (group) => {
    const newGroups = this.state.groups.map(g => g.id === group.id ? group : g);
    this.setState({ groups: newGroups });
  }

  deleteGroup = (id) => {
    const newGroups = this.state.groups.filter(g => g.id !== id);
    this.setState({ groups: newGroups });
  }

  login = (user) => {
    this.setState({ user: user });
  }

  logout = () => {
    this.setState({ user: undefined });
  }

  render() {
    const contextValue = {
      products: this.state.products,
      addProduct: this.addProduct,
      editProduct: this.editProduct,
      deleteProduct: this.deleteProduct,
      groups: this.state.groups,
      addGroup: this.addGroup,
      editGroup: this.editGroup,
      deleteGroup: this.deleteGroup,
      login: this.login,
      logout: this.logout,
      user: this.state.user,
      product: this.state.product,
    }

    return (
      <APIContext.Provider value={contextValue}>
        <div className='app'>
          <Nav loggedIn={false} />

          <main>
            <Switch>
              <Route
                exact path='/'
                component={LandingPage}
              />

              {/* <Route
                exact path='/login'
                component={LoginPage}
              /> */}

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
                  const product = contextValue.products.find(product => product.id === Number(id));

                  return <EditProductPage product={product} />
                }}
              />

              <Route
                exact path='/groups/new'
                component={AddGroupPage}
              />

              <Route
                exact path='/groups/:id'
                render={(routerProps) => {
                  const id = routerProps.match.params.id;
                  const group = contextValue.groups.find(group => group.id === Number(id));

                  if (!group) {
                    return <Redirect to='/dashboard' />
                  }

                  return <GroupPage group={group} users={STORE.users} />
                }}
              />

              <Route
                exact path='/groups/:id/edit'
                render={(routerProps) => {
                  const id = routerProps.match.params.id;
                  const group = contextValue.groups.find(group => group.id === Number(id));

                  return <EditGroupPage group={group} />
                }}
              />

              <Route
                exact path='/users/:id'
                render={(routerProps) => {
                  const id = routerProps.match.params.id;
                  const user = STORE.users.find(user => user.id === Number(id));
                  const products = contextValue.products.filter(product => product.user_id === user.id);

                  return <UserPage user={user} products={products} />
                }}
              />
            </Switch>
          </main>

          <Footer />
        </div>
      </APIContext.Provider>
    );
  }
}

export default App;