import React, { useState } from "react";

import { useRouter } from "next/router";
import { connect } from "react-redux";
import values from "lodash/values";

import retrievePostActions from "store/retrievePost/actions";
import postActions from "store/posts/actions";
import { IRetrievePost } from "interfaces";
import UpdatePost from "components/UpdatePost";

const Posts: React.FC<{
  post: IRetrievePost;
  fetchRetrievePosts: any;
  fetchUpdatePost: any;
  fetchDeletePost: any;
  fetchCreateComment: any;
}> = ({
  post,
  fetchRetrievePosts,
  fetchUpdatePost,
  fetchDeletePost,
  fetchCreateComment,
}) => {
  const router = useRouter();

  const [newComment, setNewComment] = useState("");

  const postId: string | string[] = router.query.postId;

  if (!post || post.id !== Number(postId)) {
    fetchRetrievePosts(router.query.postId).then(() => {});
  }
  // const { postId } = router.query;

  const updatePost = (postId, updateTitle, updateBody) => {
    fetchUpdatePost(postId, updateTitle, updateBody).then(() => {
      fetchRetrievePosts(router.query.postId);
    });
  };

  const deletePost = () => {
    fetchDeletePost(postId).then(() => {
      alert("Post deleted!");
      router.push("/");
    });
  };

  const changeComment = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = () => {
    fetchCreateComment(postId, newComment);
  };

  return (
    post && (
      <div className="post">
        <div className="post__title">{post.title}</div>
        <div className="post__body">{post.body}</div>
        <UpdatePost
          post={post}
          sendUpdate={updatePost}
          sendDelete={deletePost}
        />
        <div className="post__add-comment">
          <input type="text" value={newComment} onChange={changeComment} />
          <button onClick={addComment}>Add comment</button>
        </div>
        <div className="post__comments">
          {values(post.comments).map((comment) => (
            <p>{comment.body}</p>
          ))}
        </div>
      </div>
    )
  );
};

const mapStateToProps = ({ retrievePostReducer }) => ({
  post: retrievePostReducer.post,
});
const mapDispatchToProps = {
  fetchRetrievePosts: retrievePostActions.fetchRetrievePosts,
  fetchUpdatePost: postActions.fetchUpdatePost,
  fetchDeletePost: postActions.fetchDeletePost,
  fetchCreateComment: retrievePostActions.fetchCreateComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);