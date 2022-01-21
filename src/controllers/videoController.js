import Video from '../models/Video';

/*
console.log('Start');
Video.find({}, (error, videos) => {
  console.log('Finished');
  return res.render('home', { pageTitle: 'Home', videos });
});
console.log('I finish first');*/
export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createAt: 1 });
  return res.render('home', { pageTitle: 'Home', videos });
};
export const watch = async (req, res) => {
  //const id = req.params.id;
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    return res.render('watch', { pageTitle: video.title, video });
  }
  return res.status(404).render('404', { pageTitle: 'Video Not Found' });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) return res.status(404).render('404', { pageTitle: 'Video Not Found' });
  return res.render('edit', { pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id }); //filter
  if (!video) return res.status(404).render('404', { pageTitle: 'Video Not Found' });
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

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
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect('/');
  } catch (error) {
    return res.status(400).render('upload', { pageTitle: 'Upload Video', errorMessage: error._message });
  }
  //DB에 저장된 object return
  //broser는 post request로 /video/upload로 가고 get request로 /로 간다*

  //get("/video/upload/")-> form submit -> post request ("video/upload")-> redirect("/") (home page get해오라는 의미임!!)-> trending controller call 즉, get request ("/")*
};
export const remove = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect('/');
};
export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, 'i'),
        //$regex: new RegExp(`^${keyword}`, 'i'), //i: 대소문자 구분X
        //`${keyword}$`: keyword로 끝나는거 검색
        //이건 mongoDB 기능
      },
    });
  }
  return res.render('search', { pageTitle: 'Search', videos });
};
