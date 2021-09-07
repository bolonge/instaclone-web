import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
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
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;

const Home = () => {
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  console.log(data);

  return (
    <div>
      {data?.seeFeed?.map((photo) => (
        <Photo
          key={photo?.id}
          id={photo?.id}
          user={photo?.user}
          file={photo?.file}
          likes={photo?.likes}
          isLiked={photo?.isLiked}
        ></Photo>
      ))}
    </div>
  );
};
export default Home;
