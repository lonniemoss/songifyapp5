import Styles from "./FavouriteSection.module.css";
import React, { useEffect, useMemo, useState } from "react";
import GlobalStateContext from "../../state/state";
import SelectTitleButton from "../SelectTitleButton/SelectTitleButton";
import FavouriteButton from "../FavouriteButton/FavouriteButton";
class FavouriteSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFavouriteLists: false,
      updateFavouriteList: [],
    };
  }
  mountStates = () => {
    this.setState(
      (prev) => {
        return {
          ...prev,
          updateFavouriteList: [
            ...GlobalStateContext.FAVOURITEBUTTONLISTITEMS_PROXY.getState()
              .favouriteLists__Item__PROXY,
          ],
        };
      },
      () => {
        this.setState((prev) => {
          return {
            ...prev,
            showFavouriteLists: true,
          };
        });
      }
    );
  };
  componentDidMount() {
    this.mountStates();
    GlobalStateContext.FAVOURITEBUTTONLISTITEMS_PROXY.subscribe(
      (states, prevStates) => {
        if (
          states.favouriteLists__Item__PROXY.length !==
          prevStates.favouriteLists__Item__PROXY.length
        ) {
          this.mountStates();
          this.forceUpdate();
        }
      }
    );
  }
  render() {
    return (
      <section className={Styles["container"]}>
        <div className={Styles["component-title"]}>Favourites Section</div>
        {this.state.showFavouriteLists && (
          <div className={Styles["favourite-list-container"]}>
            {GlobalStateContext.FAVOURITEBUTTONLISTITEMS_PROXY.getState()
              .favouriteLists__Item__PROXY.length === 0 && (
              <div className={Styles["nodata"]}>
                No Favourites List Are Selected!
              </div>
            )}
            <ul className={`${Styles["search-list"]}`}>
              {this.state.showFavouriteLists &&
                GlobalStateContext.FAVOURITEBUTTONLISTITEMS_PROXY.getState().favouriteLists__Item__PROXY.map(
                  (element, index, array) => {
                    return (
                      <li
                        className={Styles["search-list-item"]}
                        key={index}
                        id={element.id}
                      >
                        <div className={Styles["tags-details"]}>
                          <div className={Styles["element-tags"]}>
                            <strong>Title:</strong> {element.title}
                          </div>
                          <div className={Styles["element-tags"]}>
                            <strong>Artists: </strong>
                            {element["artist-credit"]?.map(
                              (element, index, array) => {
                                return (
                                  <span key={index}>
                                    {element.name +
                                      (index !== array.length - 1 ? ", " : "")}
                                  </span>
                                );
                              }
                            )}
                          </div>
                        </div>
                        <div className={Styles["favourite-button-container"]}>
                          <FavouriteButton
                            key={index}
                            id={element.id}
                          ></FavouriteButton>
                          <SelectTitleButton
                            key={element.id + "__select-button"}
                            id={element.id}
                          ></SelectTitleButton>
                        </div>
                      </li>
                    );
                  }
                )}
            </ul>
          </div>
        )}
      </section>
    );
  }
}

export default FavouriteSection;
