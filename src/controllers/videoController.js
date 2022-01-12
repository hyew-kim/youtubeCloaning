const fakeUser = {
  username: 'hyewkim',
  loggedIn: true,
};

export const trending = (req, res) => res.render('home', { pageTitle: 'Home', fakeUser: fakeUser });
export const see = (req, res) => res.render('watch');
export const edit = (req, res) => res.send('Edit video');
export const search = (req, res) => res.send('Search');
export const upload = (req, res) => res.send('Upload');
export const remove = (req, res) => res.send('Remove video');
