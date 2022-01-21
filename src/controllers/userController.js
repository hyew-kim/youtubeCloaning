import User from '../models/User';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });
export const postJoin = async (req, res) => {
  const { email, username, password, password2, name, location } = req.body;
  if (password !== password2) return res.status(400).render('join', { pageTitle: 'Join', errorMessage: 'Not same password' });
  const Exists = await User.exists({ $or: [{ username }, { email }] });
  if (Exists) {
    return res.status(400).render('join', { pageTitle: 'Join', errorMessage: 'Not Unique' });
  }
  await User.create({
    email,
    username,
    password,
    name,
    location,
  });
  return res.redirect('/login');
};
export const login = (req, res) => res.send('login');
export const edit = (req, res) => res.send('Edit user');
export const remove = (req, res) => res.send('Remove');
export const logout = (req, res) => res.send('logout');
export const see = (req, res) => res.send(`see profile ${req.params.id}`);
