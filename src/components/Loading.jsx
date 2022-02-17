import "../styles/Loading.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="overlay">
      <TailSpin color="#00BFFF" height={80} width={80} />{" "}
    </div>
  );
};
export default Loading;
