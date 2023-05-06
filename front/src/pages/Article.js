import React, { useEffect, useState } from 'react';
import { displayNotification } from '../notifications';
import { requestGet } from '../fetch';
import LoadingButton from '../components/LoadingButton';
import { useParams } from 'react-router-dom';

export default function Article() {
  const [articles, setArticles] = useState([]);
  const {id} = useParams();
  async function getArticles() {
    requestGet('/articles/' + id.toString())
    .then(async value => {
      if (value.status !== 200) return;
      const txt = await value.text();
      setArticles(txt);
    });
  }

  async function follow() {
    requestGet('/articles/' + id.toString() + '/follow')
    .then(async value => {
      alert("Vous suivez le créateur");
    })
  }

  useEffect(() => {
    getArticles();
  }, [])

  return (
    <div>
        {articles}
        {(sessionStorage.getItem('token')) ? <button onClick={follow}>Suivre</button> : <></>}
    </div>
  );
}