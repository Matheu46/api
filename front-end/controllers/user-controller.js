import { userService } from '../services/user-service.js';
import { jwt } from '../services/jwt-service.js';

const usuarioController = {
  li: (name) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = name;
    return li;
  },
  users: async (list) => {
    // const token = await jwt.get();
    const users = await userService.findAll(); //token dentro
    users.forEach((user) => {
      list.append(usuarioController.li(user.nome));
    });
  },
};

const list = document.querySelector('#users');
usuarioController.users(list);
