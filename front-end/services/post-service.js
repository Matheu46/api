import { jwt } from './jwt-service.js';
import { config } from '../config/config.js';
export const postService = {
  posts: async (token) => {
    var response = await fetch(config.services.posts, {
      method: 'GET',
      headers: new Headers({ Authorization: 'Bearer ' + token }),
    });
    if (response.status < 400) {
      return response.json();
    }
    return response.json(); //apagar
    return false;
  },
  buscar: async (id, token) => {
    console.log(`${config.services.posts}/${id}`);
    var response = await fetch(`${config.services.posts}/${id}`, {
      method: 'GET',
      headers: new Headers({ Authorization: 'Bearer ' + token }),
    });
    if (response.status < 400) {
      return response.json();
    }
    return false;
  },

  adicionar: async (texto) => {
    //adicionar token
    const response = await fetch(config.services.posts, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      }),
      body: JSON.stringify({ texto: texto }),
    });
    return response.status < 400;
  },

  editar: async (id, texto, token) => {
    const response = await fetch(`${config.services.posts}/${id}`, {
      method: 'PUT',
      headers: new Headers({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ texto: texto }),
    });
    console.log(response);
    return response.status < 400;
  },

  apagar: async (id, token) => {
    const response = await fetch(`${config.services.posts}/${id}`, {
      method: 'DELETE',
      headers: new Headers({ Authorization: 'Bearer ' + token }),
    });
    return response.status < 400;
  },
};
