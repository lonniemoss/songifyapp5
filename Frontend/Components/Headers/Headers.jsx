import Styles from "./Headers.module.css";
function Headers(props) {
  return (
    <section className={Styles["container"]}>
      <div className={Styles["header-container"]}>
        <ul className={Styles["unordered-list"]}>
          <li className={Styles["list"]}>
            <button
              onClick={props.favourites.switchToHome}
              className={Styles["button-anchors"]}
            >
              Home
            </button>
          </li>
          <li className={Styles["list"]}>
            <button
              onClick={props.favourites.switchToFavourites}
              className={Styles["button-anchors"]}
            >
              Favourites
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Headers;
