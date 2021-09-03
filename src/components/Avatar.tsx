import styled from "styled-components";

interface AvatarProps {
  url?: string | null;
  lg?: boolean;
}

interface AvatarStyle {
  lg?: boolean;
}

const SAvatar = styled.div<AvatarStyle>`
  width: ${(props) => (props.lg ? "30px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : "25px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar: React.FunctionComponent<AvatarProps> = ({
  url = "",
  lg = false,
}) => {
  return (
    <SAvatar lg={lg}>
      {url !== "" ? <Img src={url ? url! : undefined} /> : undefined}
    </SAvatar>
  );
};

export default Avatar;
