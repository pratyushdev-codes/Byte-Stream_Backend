import Comments from "../Models/commentModel.js";
import Posts from "../Models/postModel.js";
import Users from "../Models/userModel.js";

export const createPost = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { description, image } = req.body;

    if (!description) {
      next("You must provide a description");
      return;
    }

    const post = await Posts.create({
      userId,
      description,
      image,
    });

    res.status(200).json({
      sucess: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { search } = req.body;

    const user = await Users.findById(userId);
    const friends = user?.friends?.toString().split(",") ?? [];
    friends.push(userId);

    const searchPostQuery = {
      $or: [
        {
          description: { $regex: search, $options: "i" },
        },
      ],
    };

/*$or is a logical operator in MongoDB used to perform a logical OR operation on an array of two or more expressions.

$or is used to specify a condition for searching posts. It's inside an object with an array of conditions, but in this case, there's only one condition.

$regex is a query operator that matches documents based on a regular expression pattern.
search is a variable containing the search string.

$options: "i" specifies the options for the regular expression. In this case, "i" means case-insensitive matching.

So, this expression is searching for posts where the description field matches the search string using a case-insensitive regular expression.*/

    const posts = await Posts.find(search ? searchPostQuery : {})
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl ",
      })
      .sort({ _id: -1 });

//The value -1 indicates descending order. Documents are sorted by _id in descending order, meaning the most recently inserted documents will appear first in the result set.

    const friendsPosts = posts?.filter((post) => {
    return friends.includes(post?.userId?._id.toString()) && post?.userId?._id.toString() !== userId;
});


    // const otherPosts = posts?.filter(
    //   (post) => !friends.includes(post?.userId?._id.toString())
    // );

    let postsRes = null;

    // if (friendsPosts?.length > 0) {
    //   postsRes = search ? friendsPosts : [...friendsPosts, ...otherPosts];
    // } else {
    //   postsRes = posts;
    // }

    if (friendsPosts?.length > 0) {
    //Priority Given to Friends Posts
      postsRes = friendsPosts;
    } 
    else {
      postsRes = posts;
    }

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: postsRes,
    });
    
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Posts.findById(id).populate({
      path: "userId",
      select: "firstName lastName location profileUrl ",
    }).populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "firstName lastName location profileUrl ",
      },
      options: {
        sort: "-_id",
      },
    }).populate({
      path: "comments",
      populate: {
        path: "replies.userId",
        select: "firstName lastName location profileUrl ",
      },
    });

/*The .populate() method is used to populate referenced documents in the post document.

The first .populate() populates the userId field of the post with selected fields from the user document.

The second .populate() populates the comments array within the post document.
Nested .populate() is used to populate the userId field of each comment with selected fields from the user document.
Additionally, it specifies sorting options for the populated comments array based on _id in descending order.

The third .populate() populates the replies.userId field within each comment's replies array with selected fields from the user document.*/

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getUserPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Posts.find({ userId: id })
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl",
      })
      .sort({ _id: -1 });

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const postComments = await Comments.find({ postId })
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl ",
      })
      .populate({
        path: "replies.userId",
        select: "firstName lastName location profileUrl ",
      })
      .sort({ _id: -1 });

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: postComments,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { postId } = req.params;

    const post = await Posts.findById(postId);

    const index = post.likes.findIndex((pid) => pid === String(userId));

/* .findIndex((pid) => pid === String(userId)): This is a method call on the likes array using findIndex().

findIndex() is a JavaScript array method that returns the index of the first element in the array that satisfies the provided testing function. If no element satisfies the function, it returns -1.

(pid) => pid === String(userId) is an arrow function used as the testing function. It iterates through each element (pid) in the likes array and compares it with the userId.

String(userId) converts the userId variable into a string. This is likely done to ensure that both pid and userId are of the same data type for comparison.

const index =: This assigns the index of the found element (if any) to the variable index. If no element satisfies the condition (pid === String(userId)), index will be assigned the value -1. */

    if (index === -1) {
      post.likes.push(userId);//Liking the Post
    } else {
      post.likes = post.likes.filter((pid) => pid !== String(userId));//Unliking the Post
    }

    const newPost = await Posts.findByIdAndUpdate(postId, post, {
      new: true,
    });
//by including { new: true }, we instruct Mongoose to return the modified document after the update has been applied.
    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const likePostComment = async (req, res, next) => {
  const { userId } = req.body.user;
  const { id, rid } = req.params;

  try {
    if (rid === undefined || rid === null || rid === `false`) {
      const comment = await Comments.findById(id);

      const index = comment.likes.findIndex((el) => el === String(userId));

      if (index === -1) {
        comment.likes.push(userId);
      } else {
        comment.likes = comment.likes.filter((i) => i !== String(userId));
      }

      const updated = await Comments.findByIdAndUpdate(id, comment, {
        new: true,
      });

      res.status(201).json(updated);
    } 
    //if reply id is not mentioned it means user is liking comment only otherwise user is liking reply of that comment
    else {
        const replyComments = await Comments.findOne(
            { _id: id },
            {
            replies: {
                $elemMatch: {
                _id: rid,
                },
            },
            }
      );

      const index = replyComments?.replies[0]?.likes.findIndex(
        
    //need of replies[0] as above we used findOne() so it would come as array so accessing first reply using replies[0]
    
        (i) => i === String(userId)
      );

      if (index === -1) {
        replyComments.replies[0].likes.push(userId);
      } else {
        replyComments.replies[0].likes = replyComments.replies[0]?.likes.filter(
          (i) => i !== String(userId)
        );
      }

      const query = { _id: id, "replies._id": rid };

      const updated = {
        $set: {
          "replies.$.likes": replyComments.replies[0].likes,
        },
      };

      const result = await Comments.updateOne(query, updated, { new: true });

      res.status(201).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


export const commentPost = async (req, res, next) => {
  try {
    const { comment, from } = req.body;
    const { userId } = req.body.user;
    const { id } = req.params;

    if (comment === null) {
      return res.status(404).json({ message: "Comment is required." });
    }

    const newComment = new Comments({ comment, from, userId, postId: id });

    await newComment.save();

    const post = await Posts.findById(id);
    
    post.comments.push(newComment._id);
    //updating the current post with the new post just created above

    const updatedPost = await Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(201).json(newComment);

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const replyPostComment = async (req, res, next) => {
  const { userId } = req.body.user;
  const { comment, replyAt, from } = req.body;
  const { id } = req.params;

  if (comment === null) {
    return res.status(404).json({ message: "Comment is required." });
  }

  try {
    const commentInfo = await Comments.findById(id);

    commentInfo.replies.push({
      comment,
      replyAt,
      from,
      userId,
      created_At: Date.now(),
    });

    commentInfo.save();

    res.status(200).json(commentInfo);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Posts.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
