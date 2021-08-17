import { Helmet } from "react-helmet-async";

interface IProp {
  title: string;
}

const PageTitle: React.FunctionComponent<IProp> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Instaclone</title>
    </Helmet>
  );
};

export default PageTitle;
