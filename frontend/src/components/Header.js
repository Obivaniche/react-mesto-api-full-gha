import React from 'react';
import logo from '../images/logo.svg';
import { useLocation, Link, Switch, Route } from "react-router-dom";


function Header(props) {

  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <Switch>
        <Route exact path="/">
          <div className="header__navbar">
            <a className="header__link">{props.userEmail}</a>
            <button className="button header__exit-button" type="button" onClick={props.handleLogOut}>Выйти</button>
          </div>
        </Route>
        <Route path="/sign-up">
          <Link to="sign-in" className="header__link">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link to="sign-up" className="header__link">Регистрация</Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;