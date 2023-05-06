import React, { useEffect, useState } from 'react';
import { displayNotification } from '../notifications';
import { requestGet, requestPost } from '../fetch';
import LoadingButton from '../components/LoadingButton';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  async function getArticles() {
    requestGet('/articles')
    .then(async value => {
      if (value.status !== 200) return;
      setArticles(await value.text());
    });
  }

  async function getUser() {
    requestGet('/user')
    .then(async value => {
      if (value.status !== 200) return;
      console.log(await value.text());
    });
  }

  useEffect(() => {
    getArticles();
  }, [])

  return (
    <div>

        <LoadingButton onClick={getArticles} text='Refresh'></LoadingButton>
        {(sessionStorage.getItem('token')) ? <button onClick={displayNotification}>Activer les notifications</button> : <></>}
        {/* {articles.forEach(article => {
          return <button onClick={navigate('/article/' + article.id.toString())}></button>;
        })} */}
    </div>
  );
}