import User from '../models/User';
import bcrypt from 'bcrypt';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });
export const postJoin = async (req, res) => {
  const { email, username, password, password2, name, location } = req.body;
  if (password !== password2) return res.status(400).render('join', { pageTitle: 'Join', errorMessage: 'Not same password' });
  const Exists = await User.exists({ $or: [{ username }, { email }] });
  if (Exists) {
    return res.status(400).render('join', { pageTitle: 'Join', errorMessage: 'Not Unique' });
  }
  try {
    await User.create({
      email,
      username,
      password,
      name,
      location,
    });
    return res.redirect('/login');
  } catch (error) {
    return res.status(400).render('join', { pageTitle: 'Join', errorMessage: error._message });
  }
};
export const getLogin = (req, res) => {
  return res.render('login', { pageTitle: 'Login' });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render('login', {
      pageTitle: 'Login',
      errorMessage: 'An account with this username does not exists.',
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render('login', {
      pageTitle: 'Login',
      errorMessage: 'Wrong Password.',
    });
  }
  //세션에 정보 추가
  // session 설정 된 후라 쓸 수 있움
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect('/');
};
export const edit = (req, res) => res.send('Edit user');
export const remove = (req, res) => res.send('Remove');
export const logout = (req, res) => res.send('logout');
export const see = (req, res) => res.send(`see profile ${req.params.id}`);
