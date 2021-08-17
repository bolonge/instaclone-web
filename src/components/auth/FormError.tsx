import styled from "styled-components";

const SFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

interface IProp {
  message?: string;
}

const FormError: React.FunctionComponent<IProp> = ({ message }) => {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
};

export default FormError;
