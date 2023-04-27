import Styles from "./FavouriteButton.module.css";
import React, { } from "react";
import GlobalStateContext from "../../state/state";
class FavouriteButton extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.changeButtonText();
  }
  componentDidUpdate() {
    this.changeButtonText();
  }
  changeButtonText() {
    document.querySelectorAll(".favourite-button").forEach((value) => {
      value.innerHTML = "Favourite";
    });
    GlobalStateContext.FAVOURITEBUTTONLIST_PROXY.getState().favouriteList__PROXY.forEach(
      (value) => {
        const EL = document.getElementById(value + "__favouriteBtn");
        if (EL) {
          EL.innerHTML = "Unfavourite";
        }
      }
    );
  }
  updateMappedStates = async (mappedData) => {
    let uniqueArray = new Set([...mappedData]);
    await GlobalStateContext.FAVOURITEBUTTONLISTITEMS_PROXY.getState().setFavouriteLists__Item__PROXY(
      [...uniqueArray]
    );
    this.state = {
      favouriteLists: [
        ...GlobalStateContext.FAVOURITEBUTTONLISTITEMS_PROXY.getState()
          .favouriteLists__Item__PROXY,
      ],
    };
  };
  mappedData = async () => {
    let mappedDataArray = [];
    GlobalStateContext.PROXY.getState().allMixedData__PROXY.forEach(
      (element) => {
        GlobalStateContext.FAVOURITEBUTTONLIST_PROXY.getState().favouriteList__PROXY.forEach(
          (favouriteList) => {
            if (element.id === favouriteList) {
              mappedDataArray.push(element);
            }
          }
        );
      }
    );
    await this.updateMappedStates(mappedDataArray);
  };
  removeMatchedFavouriteLists = async (favouriteListID, favouriteList) => {
    let filteredArray = [];
    favouriteList.forEach((value) => {
      if (favouriteListID !== value) {
        filteredArray.push(value);
      }
    });
    return filteredArray;
  };

  setNewFavourite = async (favouriteListID) => {
    await GlobalStateContext.FAVOURITEBUTTONLIST_PROXY.getState().setFavouriteList__PROXY(
      favouriteListID
    );
    return true;
  };
  setNewFavouriteFiltered = async (filteredLists) => {
    await GlobalStateContext.FAVOURITEBUTTONLIST_PROXY.getState().setFilteredFavouriteList__PROXY(
      filteredLists
    );
    return true;
  };
  setNewFavouriteOther = async (favouriteListID) => {
    await GlobalStateContext.FAVOURITEBUTTONLIST_PROXY.getState().setOtherFavouriteList__PROXY(
      favouriteListID
    );
    return true;
  };
  setNewFavouriteAnother = async (favouriteListID) => {
    await GlobalStateContext.FAVOURITEBUTTONLIST_PROXY.getState().setAnotherFavouriteList__PROXY(
      favouriteListID
    );
    return true;
  };
  favouriteButtonHandler = async (event) => {
    let favouriteListID = event.target.parentNode.parentNode.id;
    //disabled
    event.target.disabled = true;
    if (
      (await GlobalStateContext.FAVOURITEBUTTONLIST_PROXY.getState()
        .favouriteList__PROXY.length) === 0
    ) {
      //add first
      await this.setNewFavourite(favouriteListID);
    } else {
      const favouriteList =
        GlobalStateContext.FAVOURITEBUTTONLIST_PROXY.getState()
          .favouriteList__PROXY;
      let duplicateFound = false;
      favouriteList.forEach(async (value) => {
        if (value === favouriteListID) {
          //remove duplicate
          duplicateFound = true;
        }
      });
      if (duplicateFound) {
        const afterRemovedLists = await this.removeMatchedFavouriteLists(
          favouriteListID,
          favouriteList
        );
        await this.setNewFavouriteFiltered(afterRemovedLists);
      } else {
        await this.setNewFavouriteAnother(favouriteListID);
      }
    }
    await this.mappedData();
    this.changeButtonText();
    event.target.disabled = false;
  };
  render() {
    return (
      <button
        type="button"
        id={this.props.id + "__favouriteBtn"}
        onClick={this.favouriteButtonHandler}
        className={`${Styles["favourite-list-button"]} favourite-button`}
      >
        Favourite
      </button>
    );
  }
}

export default FavouriteButton;
