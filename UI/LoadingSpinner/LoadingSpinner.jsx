import Styles from "./LoadingSpinner.module.css";
import SpinnerPNG from "../../../public/loading.png";
import Image from "next/image";

function LoadingSpinner() {
  return (
    <span>
      <Image
        className={Styles["spinner-container"]}
        unoptimized={true}
        priority
        src={SpinnerPNG}
        width={50}
        height={50}
        alt="spinner-png"
      ></Image>
    </span>
  );
}
export default LoadingSpinner;
