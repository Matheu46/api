import { postService } from '../services/post-service.js';
import { jwt } from '../services/jwt-service.js';

const adicionarPostController = {
  adicionar: () => {
    //adicionar token
    const formulario = document.querySelector('form');
    formulario.addEventListener('submit', async (e) => {
      e.preventDefault();
      const texto = e.target.querySelector("[name='texto']").value;
      await postService.adicionar(texto); //adicionar token
      jwt.dashboard();
    });
  },
};

//jwt.protect();
const token = jwt.token();
adicionarPostController.adicionar(token);
