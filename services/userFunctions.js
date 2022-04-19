export const getUser = (email, password) => {
  const users = localStorage.getItem('users');
  if (users) {
    const user = JSON.parse(users)
      .find(data => data.email === email && data.password === password);
    return user;
  }
  return false;
};

export const saveUser = (name, email, password) => {
  const hasUser = getUser(email, password);
  if (hasUser) return false;
  const hasUsers = localStorage.getItem('users');
  if (hasUsers) {
    const users = JSON.parse(hasUsers);
    users.push({
      id: users.length, name, email, password, image: '' });
    localStorage.setItem('users', JSON.stringify(users));
  } else {
    const user = [{ id: 0, name, email, password, image: '' }];
    localStorage.setItem('users', JSON.stringify(user));
  }
};

export const saveLoggedUser = (email, password) => {
  const userData = getUser(email, password);
  localStorage.setItem('loggedUser', userData.id);
};


export const getLoggedUser = () => {
  const user = localStorage.getItem('loggedUser');
  if (user) {
    const allUsers = JSON.parse(localStorage.getItem('users'));
    const loggedUser = allUsers.find(data => data.id === Number(user));
    return loggedUser;
  }
  return false;
}

export const logout = () => {
  localStorage.removeItem('loggedUser');
}
