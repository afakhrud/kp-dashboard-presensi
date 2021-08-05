import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useContext } from 'react';
// import { IoOptionsOutline } from "react-icons/io5";
import { AiOutlineMenu } from 'react-icons/ai'; 
import { IconContext } from "react-icons";
import { FaHome } from 'react-icons/fa'
import { FaVideo } from 'react-icons/fa'
import { FaDatabase } from 'react-icons/fa'
import { Switch, Route, NavLink, Redirect, useLocation, useHistory } from 'react-router-dom';
// import { NavData } from './components/NavData';
import Home from './Home';
import Camera from './Camera';
// import Database from './Database';
import DBMahasiswa from './DBMahasiswa';
import DBKehadiran from './DBKehadiran';
import Person from './Person';
import NoMatch from './NoMatch';

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
          {/* <IoOptionsOutline size='24' color='white' onClick={toggler}/> */}
          <AiOutlineMenu size='24' color='white' onClick={toggler} style={{position: 'relative', top: 2}}/>
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
        <Route exact path='/database'>
          <Redirect to='/database/mahasiswa' />
        </Route>
        <Route exact path='/database/mahasiswa' component={DBMahasiswa} />
        <Route path='/database/kehadiran' component={DBKehadiran} />
        <Route path='/database/mahasiswa/:id' children={<Person />} />
        <Route path='*'>
          <NoMatch /> 
        </Route>
      </Switch>
    </>
  );
}

// function Navbar(props) {
//   return (
//     <> 
//       <nav className={props.className} onClick={props.pops}>
//         <ul>
//           <IconContext.Provider value={{color : 'gray'}}>
//             {NavData.map((item, index) => {
//               return (
//                 <li key={index} >
//                   <NavLink to={item.path} activeClassName='active' className={item.cName}>
//                     {item.icon}
//                     <span>{item.title}</span>
//                   </NavLink>
//                 </li>
//               )
//             })}
//           </IconContext.Provider>
//         </ul>
//       </nav>
//       <div></div>
//     </>
//   )
// }
const history = [];


function Navbar(props){
  const currentPath = useLocation();
  const isDBPath = (path) => {
    if (path.pathname.match('database') === null){
      return false;
    }else{
      return true;
    }
  }
  const [isDBActive, setDBActive] = useState(isDBPath(currentPath));
  const toggleDBDropdown = () => {
    if (!isDBPath(currentPath)){
      setDBActive(!isDBActive);
    }
  }
  
  useEffect(() => {
    history.push(currentPath);
    if(history.length > 2){
      history.shift();
    }
    if(history.length === 2){
      if(isDBPath(history[0])){
        if(!isDBPath(history[1])){
          setDBActive(false);
        }
      }
    }
  }, [currentPath])

  return (
    <>
      <nav className={props.className} >
        <ul>
          <IconContext.Provider value={{color:'gray'}}>
            <li onClick={props.pops}>
              <NavLink to='/dashboard/' activeClassName='active'>
                <FaHome />
                <span>Home</span>
              </NavLink>
            </li>
            <li onClick={props.pops}>
              <NavLink to='/camera/' activeClassName='active'>
                <FaVideo />
                <span>Camera</span>
              </NavLink>
            </li>
            <li>
              <div className={`nav-dropdown ${isDBActive? 'active' : ''}`} onClick={toggleDBDropdown}>
                <FaDatabase />
                <span>Database</span>
                <span className={isDBActive? 'dropdown-cursor-show' : 'dropdown-cursor-hide'}>
                  <div className='triangle-right'></div>
                </span>
              </div>
            </li>
            <div className={`sub-nav ${isDBActive? 'active' : ''}`} onClick={props.pops}>
              {/* <li>   */}
                <NavLink to='/database/mahasiswa' activeClassName='sub-active'>
                  Mahasiswa
                </NavLink>
              {/* </li>
              <li> */}
                <NavLink to='/database/kehadiran' activeClassName='sub-active'>
                  Kehadiran
                </NavLink>
              {/* </li> */}
            </div>
          </IconContext.Provider>
        </ul>
      </nav>
    </>
  )
}


export default App;
