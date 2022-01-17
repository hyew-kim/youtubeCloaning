import Video from '../models/Video';

/*
console.log('Start');
Video.find({}, (error, videos) => {
  console.log('Finished');
  return res.render('home', { pageTitle: 'Home', videos });
});
console.log('I finish first');*/
export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render('home', { pageTitle: 'Home', videos });
};
export const watch = (req, res) => {
  //const id = req.params.id;
  const { id } = req.params;
  return res.render('watch', { pageTitle: `Watching ${video.title}` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render('edit', { pageTitle: `Editing: ${video.title}` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render('upload', { pageTitle: 'Upload' });
};
export const postUpload = async (req, res) => {
  //here we will add a video to the videos array
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title, //title: title
      description,
      hashtags: hashtags.split(',').map((word) => (!word.trim().startsWith('#') ? `#${word.trim()}` : word.trim())),
    });
    return res.redirect('/');
  } catch (error) {
    return res.render('upload', { pageTitle: 'Upload Video', errorMessage: error._message });
  }
  //DB에 저장된 object return
  //broser는 post request로 /video/upload로 가고 get request로 /로 간다*

  //get("/video/upload/")-> form submit -> post request ("video/upload")-> redirect("/") (home page get해오라는 의미임!!)-> trending controller call 즉, get request ("/")*
};
export const search = (req, res) => res.send('Search');
export const upload = (req, res) => res.send('Upload');
export const remove = (req, res) => res.send('Remove video');
