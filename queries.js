const Post = require('./post');

const postByTitle = title => {
	return Post.findOne({ title }).exec();
};

const postsForAuthor = authorId => {
	return Post.findOne({ author: authorId }).exec();
};

const fullPostById = id => {
	return Post.findById(id).populate('author').exec();
};

const allPostsSlim = fieldsToSelect => {
	return Post.find({}).select(fieldsToSelect);
};

const postByContentLength = (maxContentLength, minContentLength) => {
	return Post.find({
		contentLength: {
			$lt: maxContentLength,
			$gt: minContentLength,
		},
	}).exec();
};

const addSimilarPosts = (postId, similarPosts) => {
	return Post.findByIdAndUpdate(
		postId,
		{
			$push: { similarPosts: { $each: similarPosts } },
		},
		{ new: true }
	).exec();
};

module.exports = {
	postByTitle,
	postsForAuthor,
	fullPostById,
	allPostsSlim,
	postByContentLength,
	addSimilarPosts,
};
