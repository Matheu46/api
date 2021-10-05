export const userService = {
  findAll: async (token) => {
    var response = await fetch('http://localhost:3000/usuarios', {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Bearer ' + token,
      }),
    });
    if (response.status < 400) {
      return response.json();
    }
    return [];
  },
};
