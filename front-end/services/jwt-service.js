export const jwt = {
  login: async (email, password) => {
    const response = await fetch('http://localhost:3000/usuarios/login', {
      method: 'POST',
      headers: new Headers({ 'Content-type': 'application/json' }),
      body: JSON.stringify({ email: email, senha: senha }),
    });
    if (response.status == 204) {
      var token = response.headers.get('Authorization');
      localStorage.setItem('jwt', token);
      return token;
    } else {
      localStorage.removeItem('jwt');
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem('jwt');
  },
  token: () => {
    if (localStorage.getItem('jwt')) {
      return localStorage.getItem('jwt');
    } else {
      return localStorage.getItem('jwt'); //apagar
      //return false;
    }
  },
  // protect: () => {
  //   if (!jwt.token()) {
  //     window.location = '../views/login.html';
  //   }
  // },
  dashboard: () => {
    if (!jwt.token()) {
      //apagar o !
      window.location = '../views/dashboard.html';
    }
  },
};
