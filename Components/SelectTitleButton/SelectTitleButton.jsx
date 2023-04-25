import React, { useEffect } from "react";
import GlobalStateContext from "../../state/state";
import Styles from "./SelectTitleButton.module.css";

class SelectTitleButton extends React.Component {
  constructor(props) {
    super(props);
  }
  selectButtonHandler = (selectedButtonEvent) => {
    if (selectedButtonEvent) {
      const buttonID = selectedButtonEvent.target.id;
      function selectAllButtons() {
        const button = document.getElementById(buttonID);
        return document.querySelectorAll("." + button.classList[0]);
      }
      this.setSelectButtonStates(selectAllButtons, buttonID);
    }
  };
  setSelectButtonStates = (selectAllButtons, buttonID) => {
    selectAllButtons().forEach((value) => {
      value.childNodes[1].childNodes[1].setAttribute("disabled", "");
    });
    GlobalStateContext.PROXY.setState((prev) => {
      return {
        ...prev,
        selectButtonClassName__PROXY: selectAllButtons(),
        listID__PROXY: buttonID,
        isTitleInfoFetched__PROXY: false,
        fetchListInfo: true,
        selectedList__PROXY: buttonID,
        titleInfoStateUpdate: true,
        refreshInfoComponent: prev.refreshInfoComponent + 1,
      };
    });
  };
  render() {
    return (
      <button
        className={Styles["select-list-button"]}
        onClick={this.selectButtonHandler}
        id={this.props.id}
      >
        Select
      </button>
    );
  }
}

export default SelectTitleButton;
