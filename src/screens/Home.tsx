import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { PHOTO_FRAGMENT } from "../fragment";
import { seeFeed } from "../__generated__/seeFeed";

const FEED_QUERY = gql`
  query seeFeed {
    ...PhotoFragment
    seeFeed {
      user {
        username
        avatar
      }
      caption
      comments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Home = () => {
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  console.log(data?.seeFeed);

  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) => (
        <Photo
          key={photo?.id}
          id={photo?.id}
          user={photo?.user}
          file={photo?.file}
          caption={photo?.caption}
          likes={photo!.likes}
          isLiked={photo?.isLiked}
          comments={photo?.comments}
          commentNumber={photo?.commentNumber}
        ></Photo>
      ))}
    </div>
  );
};
export default Home;
