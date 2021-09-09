import styled from "styled-components";
import { seeFeed_seeFeed_comments } from "../../__generated__/seeFeed";
import Comment from "./Comment";

interface CommentsProps {
  author?: string;
  caption?: string | null;
  commentNumber?: number;
  comments?: seeFeed_seeFeed_comments[] | null;
}

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 500;
  font-size: 12px;
`;

const Comments: React.FunctionComponent<CommentsProps> = ({
  author,
  caption,
  commentNumber,
  comments,
}) => {
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1
          ? "1 comment"
          : commentNumber === undefined
          ? "0 comments"
          : `${commentNumber} comments`}
      </CommentCount>

      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
    </CommentsContainer>
  );
};

export default Comments;
