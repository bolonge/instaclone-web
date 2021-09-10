import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { seeFeed } from "../__generated__/seeFeed";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
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
      commentNumber
      createdAt
      isMine
      isLiked
    }
  }
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
