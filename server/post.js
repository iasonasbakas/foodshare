const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = require('./review');

var bookSchema = new Schema({
  title: String,
  pub_year: Number,
  covers: [ String ]
}, { toJSON: { virtuals: true } });

postSchema.index({ product: 1, upload_date: 1}, { unique: true });

postSchema.pre('remove', true, function(next, done) {
  
  var post = this;

  Review.remove({
    book: book._id
  }, function(err, result) {
    if (err) {
      console.log('Could not remove associated reviews');
      next(err);
      done();
    } else {
      next();
      done();
    }
  });
});

module.exports = mongoose.model('Post', bookSchema);