import { MutationUpdaterFn, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  deleteComment,
  deleteCommentVariables,
} from "../../__generated__/deleteComment";
import { FatText } from "../shared";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

interface CommentProps {
  id?: number;
  photoId?: number;
  author?: string;
  payload?: string | null;
  isMine?: boolean;
}

const CommentCaption = styled.span`
  margin-left: 10px;
  mark {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
`;

const CommentCotainer = styled.div`
  margin-left: 10px;
`;

const Comment: React.FunctionComponent<CommentProps> = ({
  id,
  photoId,
  author,
  payload,
  isMine,
}) => {
  const updateDeleteComment: MutationUpdaterFn<deleteComment> = (
    cache,
    result
  ) => {
    const { data } = result;
    if (data?.deleteComment?.ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation<
    deleteComment,
    deleteCommentVariables
  >(DELETE_COMMENT_MUTATION, {
    variables: {
      id: id!,
    },
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  return (
    <CommentCotainer>
      <Link to={`users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CommentCaption>
        {payload?.split(" ").map((word, index) =>
          /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? <button onClick={onDeleteClick}>x</button> : null}
    </CommentCotainer>
  );
};

export default Comment;
