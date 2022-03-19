import { Context } from './../index';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from './../utils/constants';
import { fetchComradesAndAddFriends, login, registration } from './../http/userAPI';
import classes from './Auth.module.css'

const Auth = observer(() => {
  const {user} = useContext(Context)

  const navigate = useNavigate()
  const {pathname} = useLocation()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  let isLogin = pathname === LOGIN_ROUTE

  const changeActive = event => {
    let inputs = document.querySelectorAll('input')
    Array.from(inputs).map(input => input.classList.contains('active') && input.classList.remove('active'))
    event.target.classList.add('active')
  }

  const click = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
        navigate(MAIN_ROUTE)
      } else {
        data = await registration(null, email, name, password)
        navigate(LOGIN_ROUTE)
      }
      fetchComradesAndAddFriends(data.id).then(info => {
        data.comradeId = info.comradeId
        data.addFriends = info.friendId
        data.friends = JSON.parse(data.friends)
        user.setUser(data)
      })
      user.setIsAuth(true)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
  
  return (
    <div className='container' onClick={event => {
      if (!event.target.classList.contains('active'))
        Array.from(document.querySelectorAll('input')).map(input => input.classList.remove('active'))
    }}>
      <div id={classes.header} className="header row">
        <button 
          className="dark"
          id={classes.back}
          onClick={() => navigate(MAIN_ROUTE)}
        >
          Назад
        </button>
        <button 
          className="dark"
          id={classes.support}
        >
          Поддержать автора
        </button>
      </div>

      <div id="animate_main_auth" className={classes.main + " main col"}>
        <div className={classes.inputs + " col"}>
          <div className='dark-gray-color' id={classes.title}>
            {pathname === '/login' ? 'Вход' : 'Регистрация'}
          </div>
          {!isLogin && 
            <input
              value = {name} 
              type="text"
              className={classes.input_mb}
              placeholder='Введите имя...'
              onChange={event => setName(event.target.value)}
              onClick = {event => {
                changeActive(event)
              }}
            />
          }
          <input
            value={email} 
            type="text"
            className={classes.input_mb}
            placeholder='Введите email...'
            onChange={event => setEmail(event.target.value)}
            onClick={event => {
              changeActive(event)
            }}
          />
          <input
            value={password}
            type="password" 
            placeholder='Введите пароль...'
            onChange={event => setPassword(event.target.value)}
            onClick={event => {
              changeActive(event)
            }}
          />
        </div>
        <div className="row light-gray-color" id={classes.log_reg}>
          {isLogin
          ? <div>
              Нет аккаунта?
              <Link 
                to={REGISTRATION_ROUTE} 
                className={classes.account} 
                onClick={() => {
                  document.getElementById('animate_main_auth').classList.add(classes.animate_auth)
                  setTimeout(() => document.getElementById('animate_main_auth').classList.remove(classes.animate_auth), 200)
                }}
              >
                Зарегистрируйтесь!
              </Link>
            </div>
          : <div>
              Есть аккаунт?
              <Link 
                to={LOGIN_ROUTE} 
                className={classes.account} 
                onClick={() => {
                  document.getElementById('animate_main_auth').classList.add(classes.animate_auth)
                  setTimeout(() => document.getElementById('animate_main_auth').classList.remove(classes.animate_auth), 200)
                }}
                >
                  Войдите!
              </Link>
            </div>} 
        </div>
        <div className="row" id={classes.btn_wrapper}>
          <button 
            id={classes.log_reg_btn}
            className='light'
            onClick={() => {
              click()
            }}
          >
            {isLogin
            ? 'Войти'
            : 'Зарегистрироваться'
            }
          </button>
        </div>
          
      </div>

    </div>
  );
});

export default Auth;