import styled from "styled-components";

interface AvatarProps {
  url?: string;
}

const SAvatar = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 15px;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar: React.FunctionComponent<AvatarProps> = ({ url = "" }) => {
  return <SAvatar>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
};

export default Avatar;
