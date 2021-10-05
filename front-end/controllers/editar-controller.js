import { postService } from '../services/post-service';
import { jwt } from '../services/jwt-service';

const editarPostController = {
  editar: async (token) => {
    const formulario = document.querySelector('form');
    const url = new URL(window.location);
    const id = url.searchParams.get('id');
    const post = await postService.buscar(id, token);
    formulario.querySelector("[name='texto']").textContent = post.texto;
    formulario.addEventListener('submit', async (e) => {
      e.preventDefault();
      const texto = e.target.querySelector("[name='texto']").value;
      postService.editar(id, texto, token);
      jwt.dashboard();
    });
  },
};

//jwt.protect();
const token = jwt.token();
editarPostController.editar(token);
