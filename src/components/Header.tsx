import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../routes";

interface IProp {}

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.header`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.header``;

const Icon = styled.header`
  margin-left: 15px;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`;

const Header: React.FunctionComponent<IProp> = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Icon>
            <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
          </Icon>
        </Column>
        <Column>
          {isLoggedIn ? (
            <>
              <Icon>
                <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass}></FontAwesomeIcon>
              </Icon>
              {data?.me?.avatar ? (
                ""
              ) : (
                <Icon>
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </Icon>
              )}
            </>
          ) : (
            <Link to={routes.home}>
              <Button></Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
};

export default Header;
