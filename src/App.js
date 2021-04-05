import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import './default.scss'
import { checkUserSession } from './redux/User/user.actions';

//hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

//pages
import Homepage from './pages/Homepage';
import Search from './pages/Search';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

//layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';
import PaymentDetails from './components/PaymentDetails';
import WelcomeLayout from './layouts/WelcomeLayout';


const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => (
          <WelcomeLayout >
            <Homepage />
          </WelcomeLayout>
        )} />
        <Route exact path='/search' render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )} />
        <Route path='/search/:filterType' render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )} />
        <Route path='/product/:productID' render={() => (
          <MainLayout>
            <ProductDetails />
          </MainLayout>
        )} />
        <Route path='/cart' render={() => (
          <MainLayout >
            <Cart />
          </MainLayout>
        )} />
        <Route path='/payment' render={() => (
          <WithAuth>
          <MainLayout>
            <Payment />
          </MainLayout>
          </WithAuth>
        )} />
        <Route path='/registration' render={() => (
          <MainLayout >
            <Registration />
          </MainLayout>
        )} />
        <Route path='/login'
          render={() => (
            <MainLayout >
              <Login />
            </MainLayout>
          )} />
        <Route path='/recovery' render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />
        <Route path='/dashboard' render={() => (
          <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </WithAuth>
        )} />
        <Route path='/admin' render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </WithAdminAuth>
        )} />
        
      </Switch>
    </div>
  );
}

export default App;
