import React, { useState } from 'react';
import { requestPost } from '../fetch';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingButton from '../components/LoadingButton';


export default function Login() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function submit() {
    try {
      requestPost('/user/login', {login: login, password: password}, {})
      .then(async value => {
        if (value.status === 200) {
          sessionStorage.setItem('token', await value.text());
          navigate('/');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <input onChange={(value) => setLogin(value.target.value)} value={login} placeholder='Login'/>
      <input onChange={(value) => setPassword(value.target.value)} value={password} placeholder='Mot de passe'/>
      <LoadingButton onClick={submit} text='Connection'></LoadingButton>
    </div>
  );
}