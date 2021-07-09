import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useContext } from 'react';
import { IoOptionsOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { NavData } from './components/NavData';
import Home from './Home';
import Camera from './Camera';
import Database from './Database';


function App() {
  const mobNavShow = {
    'display' : 'flex'
  };
  const mobNavHide = {
    'display' : 'none'
  };
  const [state, setToggler] = useState(false);
  const toggler = () => {
    setToggler(!state);
  };


  return (
    <>
      <header>
        <h4>Dashboard Presensi Lab Honeywell</h4>
        <div className='card-wrapper no-outline toggle-menu'>
          <IoOptionsOutline size='24' color='white' onClick={toggler}/>
        </div>
      </header>
      {/* <div className='loading'>
        <div className='loading-text'>Loading..</div>
        <div className='loading-spinner'>
          <div className='car-body-top'></div>
          <div className='car-body-bottom'></div>
          <div className='car-tires'>
            <div className='car-tire'></div>
            <div className='car-tire'></div>
          </div>
        </div>
      </div> */}
      <Navbar className={state ? 'show' : ''} pops={toggler} />
      <Switch>
        <Route exact path='/'>
          <Redirect to='/dashboard' />
        </Route>
        <Route path='/dashboard' component={Home} />
        <Route path='/camera' component={Camera} />
        <Route path='/database' component={Database} />
      </Switch>
    </>
  );
}

function Navbar(props) {
  return (
    <> 
      <nav className={props.className} onClick={props.pops}>
        <ul>
          <IconContext.Provider value={{color : 'gray'}}>
            {NavData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink to={item.path} activeClassName='active'>
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              )
            })}
          </IconContext.Provider>
        </ul>
      </nav>
      <div></div>
    </>
  )
}


export default App;
