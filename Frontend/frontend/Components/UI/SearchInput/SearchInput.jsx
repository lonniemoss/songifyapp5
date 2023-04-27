import React, { useState, useRef, useEffect } from "react";
import Styles from "./SearchInput.module.css";
import Axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import GlobalStateContext from "../../../state/state";
import FavouriteButton from "../../FavouriteButton/FavouriteButton";
import SelectTitleButton from "@/Components/SelectTitleButton/SelectTitleButton";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: "",
      isListFetched: false,
      showLoadingSpinner: false,
      mixedListData: [],
      favouriteListRef: null,
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState((state) => {
      return { ...state, mixedListData: [] };
    });
    GlobalStateContext.PROXY.setState((state) => {
      return {
        ...state,
        selectedList__PROXY: null,
      };
    });
    this.setState((state) => {
      return { ...state, showLoadingSpinner: true };
    });
    await Axios.post("/api/title", { input: event.target[0].value })
      .then((response) => {
        if (response.status === 200) {
          this.setState((state) => {
            return {
              ...state,
              mixedListData: [
                ...response.data.message.ReleaseResponseData?.releases,
                ...response.data.message.RecordingResponseData.recordings,
              ],
            };
          });
          GlobalStateContext.PROXY.setState((state) => {
            return {
              ...state,
              onlyCurrentMixedData: [
                ...response.data.message.ReleaseResponseData?.releases,
                ...response.data.message.RecordingResponseData.recordings,
              ],
            };
          });
          GlobalStateContext.PROXY.setState((prev) => {
            return {
              ...prev,
              allMixedData__PROXY: [
                ...prev.allMixedData__PROXY,
                ...response.data.message.ReleaseResponseData?.releases,
                ...response.data.message.RecordingResponseData.recordings,
              ],
            };
          });
          //pagination process
          const beforeDividedLists = [
            ...response.data.message.ReleaseResponseData.releases,
            ...response.data.message.RecordingResponseData.recordings,
          ];
          const itemsPerPage =
            GlobalStateContext.PAGINATION_PROXY.getState().dividePagesIn;
          const dividedPages = [];
          for (
            let i = 1;
            i < Math.floor(beforeDividedLists.length / itemsPerPage);
            i++
          ) {
            dividedPages.push([]);
          }
          let count = 0;
          let pageCount = 0;
          beforeDividedLists.forEach((value) => {
            if (count < itemsPerPage) {
              try {
                dividedPages[pageCount].push(value);
              } catch (err) {
                return;
              }
              count++;
            } else {
              ++pageCount;
              count = 0;
            }
          });
          GlobalStateContext.PAGINATION_PROXY.setState((state) => {
            return {
              ...state,
              dividedPagesList: [...dividedPages],
            };
          });
        }
      })
      .catch((error) => console.log(error.response.data))
      .finally(() => {
        this.setState((state) => {
          return { ...state, isListFetched: true };
        });
        GlobalStateContext.PROXY.setState((state) => {
          return {
            ...state,
            isListFetched: true,
          };
        });
        this.setState((state) => {
          return { ...state, showLoadingSpinner: false };
        });
      });
  };

  render() {
    return (
      <div className={Styles["search-container"]}>
        <form className={Styles["form"]} onSubmit={this.handleSubmit}>
          <input
            className={Styles["search-text-input"]}
            type="text"
            placeholder="Search Title"
            required
          ></input>
          <button
            className={Styles["submit-btn"]}
            type="submit"
            disabled={this.showLoadingSpinner ? true : false}
          >
            {this.state.showLoadingSpinner && <LoadingSpinner></LoadingSpinner>}
            {!this.state.showLoadingSpinner && "Search"}
          </button>
        </form>
      </div>
    );
  }
}
export default SearchInput;
