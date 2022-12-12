import { useNavigate } from "react-router-dom";

// this is needed to use react-router's navigate with class components
export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};
