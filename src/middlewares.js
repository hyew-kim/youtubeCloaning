import multer from 'multer';

export const localMiddleware = (req, res, next) => {
  //console.log('req: ', req.session);
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = 'Wetube';
  res.locals.loggedInUser = req.session.user || {};
  //console.log('res: ', res.locals);
  next();
};
// localMiddleware가 session middleware 뒤에 있어서 가능

//임의로 url 입력해서 접근하는거 방지
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) return next();
  else res.redirect('/login');
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) return next();
  else res.redirect('/');
};
export const avatorUpload = multer({ dest: 'uploads/avators/' });
export const videoUpload = multer({
  dest: 'uploads/videos/',
  limits: {
    fileSize: 10000000,
  },
});
