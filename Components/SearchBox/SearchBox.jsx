
import Styles from "./SearchBox.module.css";
function SearchBox(props) {
  return (
    <section className={Styles["box-section"]}>
      <div className={Styles["box-container"]}>
        <div className={Styles["search-box-container"]}>
          {props.children[0]}
        </div>
        <div className={Styles["info-box-container"]}>
          {props.children[1]}
        </div>
      </div>
    </section>
  );
}
export default SearchBox;
