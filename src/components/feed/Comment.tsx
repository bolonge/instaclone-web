import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../shared";

interface CommentProps {
  author?: string;
  payload?: string | null;
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
  author,
  payload,
}) => {
  return (
    <CommentCotainer>
      <FatText>{author}</FatText>
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
    </CommentCotainer>
  );
};

export default Comment;
