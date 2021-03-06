import styled from "styled-components";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { MutationUpdaterFn, useMutation } from "@apollo/client";
import {
  seeFeed_seeFeed_comments,
  seeFeed_seeFeed_user,
} from "../../__generated__/seeFeed";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";
import Comments from "./Comments";
import { Link } from "react-router-dom";

interface PhotoProps {
  id?: number;
  user?: seeFeed_seeFeed_user | null;
  file?: string;
  likes: number;
  isLiked?: boolean;
  caption?: string | null;
  commentNumber?: number;
  comments?: (seeFeed_seeFeed_comments | null)[] | null;
}

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  margin-bottom: 20px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-height: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const Photo: React.FunctionComponent<PhotoProps> = ({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}) => {
  const updateToggleLike: MutationUpdaterFn<toggleLike> = (cache, result) => {
    const { data } = result;
    if (data?.toggleLike.ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        id: id!,
      },
      update: updateToggleLike,
    }
  );
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/users/${user?.username}`}>
          <Avatar lg url={user?.avatar} />
        </Link>
        <Link to={`/users/${user?.username}`}>
          <Username>{user?.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile src={file!} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction>
              <span onClick={() => toggleLikeMutation()}>
                <FontAwesomeIcon
                  style={{ color: isLiked ? "tomato" : "inherit" }}
                  size={"2x"}
                  icon={isLiked ? SolidHeart : faHeart}
                ></FontAwesomeIcon>
              </span>
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon size={"2x"} icon={faComment}></FontAwesomeIcon>
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon
                size={"2x"}
                icon={faPaperPlane}
              ></FontAwesomeIcon>
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon size={"2x"} icon={faBookmark}></FontAwesomeIcon>
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        <Comments
          photoId={id}
          author={user?.username}
          caption={caption}
          commentNumber={commentNumber}
          comments={comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
