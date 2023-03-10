mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// require("dotenv").config()

const mongoURL = process.env.mongoURL
mongoose.connect(mongoURL);
const dailyPostSchema = new mongoose.Schema(
    {
        "title": {
            type: String,
            require: true,
            length: 100
        },
        "date": {
            type: Date,
            require: true,
        },
        "content": {
            type: String
        },
    }
)

const DailyPost = mongoose.model("DailyPost", dailyPostSchema);

exports.getAllPosts = async function (callback) {
    const result = await DailyPost.find().exec();
    if(callback) {
        callback(result);
    } else {
        return result;
    }
}

exports.getPostById = async function (id, callback) {
    const result = await DailyPost.findById(id).exec();
    if(callback) {
        callback(result);
    } else {
        return result;
    }
}

exports.addPost = function (post) {
    DailyPost.create(post, function (err, inserted) {
        console.log(err ? err : inserted.length + " post(s) inserted");
    })
}

exports.updatePostById = function (id, revisedPost) {
    DailyPost.updateOne({_id: id}, revisedPost, function (err, res) {
        console.log(err ? err : res.modifiedCount);
    })
}

