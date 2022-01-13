let videos = [
  {
    title: 'First Video',
    rating: 5,
    comments: 2,
    createdAt: '2 minutes ago',
    views: 59,
    id: 1,
  },
  {
    title: 'Second Video',
    rating: 5,
    comments: 2,
    createdAt: '2 minutes ago',
    views: 1,
    id: 2,
  },
  {
    title: 'Third Video',
    rating: 5,
    comments: 2,
    createdAt: '2 minutes ago',
    views: 9,
    id: 3,
  },
];

export const trending = (req, res) => res.render('home', { pageTitle: 'Home', videos });
export const watch = (req, res) => {
  //const id = req.params.id;
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render('watch', { pageTitle: `Watching ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render('edit', { pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render('upload', { pageTitle: 'Upload' });
};
export const postUpload = (req, res) => {
  //here we will add a video to the videos array
  const newVideo = {
    title: req.body.title,
    rating: 0,
    comments: 0,
    createdAt: '2 minutes ago',
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect('/');
  //broser는 post request로 /video/upload로 가고 get request로 /로 간다
  //get("/video/upload/")-> form submit -> post request ("video/upload")-> redirect("/") (home page get해오라는 의미임!!)-> trending controller call 즉, get request ("/")
};
export const search = (req, res) => res.send('Search');
export const upload = (req, res) => res.send('Upload');
export const remove = (req, res) => res.send('Remove video');
