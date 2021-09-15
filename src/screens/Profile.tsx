import gql from "graphql-tag";
import { useParams } from "react-router";
import { PHOTO_FRAGMENT } from "../fragment";

interface ProfileProps {}

interface ParamsProps {
  username: string;
}

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Profile: React.FunctionComponent<ProfileProps> = () => {
  const { username } = useParams<ParamsProps>();
  return <div></div>;
};
export default Profile;
