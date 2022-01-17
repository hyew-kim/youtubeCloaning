import mongoose from 'mongoose';
//schema 정의 (model의 모양)
const videoSchema = new mongoose.Schema({
  title: String, //{type: String}
  description: String,
  createAt: { type: Date, required: true, default: Date.now },
  //()빼는 이유는 바로 실행하고 싶지 않아서!
  hashtags: [{ type: String }], //Array
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

const Video = mongoose.model('Video', videoSchema);
export default Video;
