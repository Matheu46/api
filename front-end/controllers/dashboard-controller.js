import { jwt } from '../services/jwt-service.js';
import { postService } from '../services/post-service.js';

const dashboardController = {
  card: (id, texto) => {
    const div = document.createElement('div');
    div.classList.add('card', 'mb-3');
    const html = `
      <div class="card-header d-flex">
        <i class="fas fa-comments flex-grow-1"></i>
        <i class="fas fa-edit me-2"></i>
        <i class="fas fa-trash"></i>
      </div>
      <div class="card-body">
        ${texto}
      </div>
    `;
    div.innerHTML = html;
    div.dataset.id = id;
    return div;
  },
  load: async (div, token) => {
    const posts = await postService.posts(token);
    posts.forEach((post) => {
      div.append(dashboardController.card(post.id, post.texto));
    });
    div.addEventListener('click', async (e) => {
      const el = e.target;
      if (el.classList.contains('fa-trash')) {
        const card = el.closest('[data-id]');
        const id = card.dataset.id;
        await postService.apagar(id, token);
        card.remove();
      }
      if (el.classList.contains('fa-edit')) {
        const card = el.closest('[data-id]');
        const id = card.dataset.id;
        window.location = `../views/editar.html?id=${id}`;
      }
    });
  },
};

//jwt.protect();

const bt_logout = document.querySelector('#logout');
bt_logout.addEventListener('click', async (e) => {
  jwt.logout();
  window.location = '../index.html';
});

const token = jwt.token();
const div = document.querySelector('#posts');
dashboardController.load(div, token);
