export const baseUrl = 'https://gregoriex.fr/api'

export async function requestGet(url, absolute = false) {
  const req = {
    method: 'GET',
    headers: {},
  };
  if (sessionStorage.getItem('token')) {
    req.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
  }
  const res = await fetch(`${!absolute ? baseUrl : ''}${url}`, req);
  return res;
}

export async function requestPost(url, body, opt) {
  const req = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  if (sessionStorage.getItem('token')) {
    req.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
  }
  const res = await fetch(`${baseUrl}${url}`, req);
  if (!res.ok && !opt?.noalert) {
    const json = await res.json();
    alert(`Erreur: ${json.message}`);
  }
  return res;
}

export async function requestPatch(url, body) {
  const req = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  if (sessionStorage.getItem('token')) {
    req.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
  }
  const res = await fetch(`${baseUrl}${url}`, req);
  if (!res.ok) {
    const json = await res.json();
    alert(`Erreur: ${json.message}`);
  }
  return res;
}

export async function requestDelete(url) {
  const req = {
    method: 'DELETE',
    headers: {},
  };
  if (sessionStorage.getItem('token')) {
    req.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
  }
  const res = await fetch(`${baseUrl}${url}`, req);
  if (!res.ok) {
    const json = await res.json();
    let err = json.message;
    if (json.length) err = json.map(e => e.message).join('; ');
    alert(`Erreur: ${err}`);
  }
  return res;
}

