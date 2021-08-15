import { Helmet } from "react-helmet-async";

interface IProp {
  title: string;
}

const PageTitle: React.FunctionComponent<IProp> = ({ title }) => {
  return <Helmet>{title} | Instaclone</Helmet>;
};

export default PageTitle;
