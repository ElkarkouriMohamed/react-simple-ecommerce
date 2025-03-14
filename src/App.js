import { Provider } from 'react-redux';
import store from './app/store';
import { Routes, Route } from 'react-router-dom';
import Header from './Ecommerce_store/nav_v2/Header';
import SignIn from './Ecommerce_store/signIn/SignIn';
import SignInWithEmail from './Ecommerce_store/signIn/withEmailAndPassword/SignInWithEmail';
import PasswordReset from './Ecommerce_store/signIn/passwordReset/PasswordReset';
import SignUp from './Ecommerce_store/signUp/SignUp';
import Home from './Ecommerce_store/home/Home';
import Shop from './Ecommerce_store/shop/Shop';
import ProductPage from './Ecommerce_store/shop/productPage/ProductPage';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-in-email'  element={<SignInWithEmail />} />
        <Route path='/password-reset' element={<PasswordReset />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/products' element={<Shop />}/>
        <Route path='/products/:id' element={<ProductPage />}/>
        <Route path='/deals' element={<div>deals</div>}/>
        <Route path='/contact' element={<div>contact</div>}/>
        <Route path='/best-sellers' element={<div>contact</div>} />
        <Route path='/categories' element={<div>categories</div>} />
      </Routes>
    </Provider>
  );
}

export default App;
