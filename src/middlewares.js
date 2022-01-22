export const localMiddleware = (req, res, next) => {
  //console.log('req: ', req.session);
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = 'Wetube';
  res.locals.loggedInUser = req.session.user;
  //console.log('res: ', res.locals);
  next();
};
// localMiddleware가 session middleware 뒤에 있어서 가능
