import styled from "styled-components";
import { FatText } from "../shared";

interface CommentProps {
  author?: string;
  payload?: string;
}

const CommentCaption = styled.span``;

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
      <CommentCaption>{payload}</CommentCaption>
    </CommentCotainer>
  );
};

export default Comment;
