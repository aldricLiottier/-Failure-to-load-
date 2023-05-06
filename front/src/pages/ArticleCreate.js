import React, { useState } from 'react';
import { requestPost } from '../fetch';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingButton from '../components/LoadingButton';


export default function ArticleCreate() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const navigate = useNavigate()

  async function submit() {
    try {
      requestPost('/articles', {title: title, text: text}, {})
      .then(async value => {
        if (value.status === 200) {
          navigate('/');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <input onChange={(value) => setTitle(value.target.value)} value={title} placeholder='Titre'/>
      <input onChange={(value) => setText(value.target.value)} value={text} placeholder='Texte'/>
      <LoadingButton onClick={submit} text='Valider'></LoadingButton>
    </div>
  );
}