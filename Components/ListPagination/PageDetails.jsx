import React from "react";
import GlobalStateContext from "../../state/state";
import Styles from "./PageDetails.module.css";
import FavouriteButton from "../FavouriteButton/FavouriteButton";
import SelectTitleButton from "../SelectTitleButton/SelectTitleButton";
class PageDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPageLists: [],
      changeKeyCount: 0,
    };
    if (
      GlobalStateContext.PAGINATION_PROXY.getState().dividedPagesList.length -
        1 >
      this.props.anotherKey
    ) {
      this.state = {
        ...this.state,
        currentPageLists: [
          ...GlobalStateContext.PAGINATION_PROXY.getState().dividedPagesList[
            this.props.anotherKey
          ],
        ],
      };
    }
  }
  componentDidUpdate() {
    GlobalStateContext.PAGINATION_PROXY.subscribe((state) => {
      this.setState(
        (prevState) => {
          return {
            ...prevState,
            changeKeyCount: prevState.changeKeyCount + 1,
          };
        },
        () => {
          console.log("test", state.dividedPagesList[0]);
        }
      );
    });
  }
  render() {
    return (
      <div key={this.state.changeKeyCount} className={Styles["container"]}>
        <ul
          className={`${Styles["search-list"]}`}
          key={this.state.changeKeyCount}
        >
          {this.state.currentPageLists.map((element, index, array) => {
            return (
              <li
                className={Styles["search-list-item"]}
                key={index}
                id={element.id}
              >
                <div className={Styles["search-list-item-details-container"]}>
                  <div className={Styles["element-tags"]}>
                    <strong>Title:</strong> {element.title}
                  </div>
                  <div className={Styles["element-tags"]}>
                    <strong>Artists: </strong>
                    {element["artist-credit"]?.map((element, index, array) => {
                      return (
                        <span key={index}>
                          {element.name +
                            (index !== array.length - 1 ? ", " : "")}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className={Styles["favourite-select-button-container"]}>
                  <FavouriteButton
                    key={element.id + "__favourite-button"}
                    id={element.id}
                  ></FavouriteButton>
                  <SelectTitleButton
                    key={element.id + "__select-button"}
                    id={element.id}
                  ></SelectTitleButton>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default PageDetails;
