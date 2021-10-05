import { jwt } from '../services/jwt-service';

const loginController = {
  login: () => {
    if (jwt.token()) {
      jwt.dashboard();
    }
    const formulario = document.querySelector('form');
    formulario.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = e.target.querySelector("[name='email']").value;
      const senha = e.target.querySelector("[name='senha']").value;
      if (await jwt.login(email, senha)) {
        jwt.dashboard();
      }
    });
  },
};
//*-*
