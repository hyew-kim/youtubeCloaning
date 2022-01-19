import mongoose from 'mongoose';
//schema 정의 (model의 모양)
const videoSchema = new mongoose.Schema({
  title: { type: String, trim: true }, //{type: String}
  description: { type: String, trim: true },
  createAt: { type: Date, required: true, default: Date.now },
  //()빼는 이유는 바로 실행하고 싶지 않아서!
  hashtags: [{ type: String, trim: true }], //Array
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

//save hook 발생 시 save되기 전에 실행시킬 middleware

videoSchema.static('formatHashtags', function (hashtags) {
  return hashtags.split(',').map((word) => (word.trim().startsWith('#') ? word.trim : `#${word.trim()}`));
});

const Video = mongoose.model('Video', videoSchema);
export default Video;
