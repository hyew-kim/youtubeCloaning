import mongoose from 'mongoose';
//schema 정의 (model의 모양)
const videoSchema = new mongoose.Schema({
  title: String, //{type: String}
  description: String,
  createAt: Date,
  hastags: [{ type: String }], //Array
  meta: {
    views: Number,
    rating: Number,
  },
});

const Video = mongoose.model('Video', videoSchema);
export default Video;
