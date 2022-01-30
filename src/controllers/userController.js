import User from '../models/User';
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';

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
  const user = await User.findOne({ username, socialOnly: false });
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
export const getEdit = (req, res) => {
  return res.render('edit-profile', { pageTitle: 'Edit-profile' });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id /*avatorUrl*/ },
      //model instance생성 시 _id 자동으로 생성
    },
    body: { email, username, name, location, avatar },
    file,
  } = req;
  //db에서 기존 data와 겹치는거 없는지
  const existUsername = await User.exists({ username });
  const existEmail = await User.exists({ email });
  const pageTitle = 'Edit-profile';
  if (username !== req.session.user.username) {
    if (existUsername) return res.status(400).render('edit-profile', { pageTitle, errorMessage: 'Exits username' });
  }
  if (email !== req.session.user.email) {
    if (existEmail) return res.status(400).render('edit-profile', { pageTitle, errorMessage: 'Exits  email' });
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      email,
      name,
      username,
      location,
      //avatarUrl : file ? file.path : avatarUrl,
    },
    { new: true }
  );
  req.session.user = updatedUser;

  return res.redirect('/users/edit-profile');
};

export const startGithubLogin = (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/authorize';
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    //scope's delimeter is blank!!
    scope: 'read:user user:email',
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/access_token';
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
    //github이 redirect한 url에 code, client_id 있음
    //url에 있는 값은 req.query로 접근
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  //post 요청을 보내서 access token 으로 교환
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();
  if ('access_token' in tokenRequest) {
    const apiUrl = 'https://api.github.com';
    const { access_token } = tokenRequest;
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find((email) => email.primary === true && email.verified === true);
    if (!emailObj) {
      return res.redirect('/login');
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      //user 생성 but 소셜 로그인은 비번x
      user = await User.create({
        email: emailObj.email,
        socialOnly: true,
        username: userData.login,
        password: '',
        name: userData.name,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect('/');
  } else {
    return res.redirect('/login');
  }
};

export const logout = (req, res) => {};
export const remove = (req, res) => res.send('Remove');
export const see = (req, res) => res.send(`see profile ${req.params.id}`);
