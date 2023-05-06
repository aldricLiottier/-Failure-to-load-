import React, { useState } from 'react';
import { requestPost } from '../fetch';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function submit() {
    requestPost('/user/register', {login: login, password: password}, {})
    .then(value => {
      if (value.status === 201) {
        navigate('/');
      }
    });
  }

  return (
    <div>
      <input onChange={(value) => setLogin(value.target.value)} value={login} placeholder='Login'/>
      <input onChange={(value) => setPassword(value.target.value)} value={password} placeholder='Mot de passe'/>
      <button onClick={submit}>S'inscrire</button>
    </div>
  );
}