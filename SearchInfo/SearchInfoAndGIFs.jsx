import Styles from "./SearchInfoAndGIFs.module.css";
import cdIMG from "../../public/cd.png";
import Image from "next/image";
import Axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import GlobalStateContext from "../../state/state";

class SearchInfoAndGIFs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGifsLoaded: false,
      gifData: [],
      coverTitleURL: "",
      showLoadingSpinner: false,
      showGenerateButton: false,
      isInfosFetched: [false, false],
      selectButtonClassName: [],
      isFetchedComplete: false,
      selectedListID: GlobalStateContext.PROXY.getState().listID__PROXY, //for matching purpose
    };
  }
  componentDidMount() {
    GlobalStateContext.PROXY.subscribe(async (state, prevState) => {
      if (this.state.selectedListID !== state.listID__PROXY) {
        this.setState(
          (state) => {
            return {
              ...state,
              selectedListID: state.listID__PROXY,
              selectButtonClassName: [state.selectButtonClassName__PROXY],
            };
          },
          async () => {
            let afterFetched = false;
            afterFetched = await this.generate();
            if (afterFetched) {
              state.selectButtonClassName__PROXY.forEach((value) => {
                value.childNodes[1].childNodes[1].removeAttribute("disabled");
              });
            }
            this.render();
          }
        );
      }
    });
  }

  generate = async () => {
    if (GlobalStateContext.PROXY.getState().fetchListInfo) {
      await new Promise(async (resolve, reject) => {
        resolve([
          await this.fetchInfoTitleFunc(),
          await this.fetchInfoTitleCoverArtFunc(),
        ]);
      }).then(() => {
        this.setState((value) => {
          return {
            ...value,
            showGenerateButton: true,
            isFetchedComplete: true,
          };
        });
      });
    }
    return true;
  };
  fetchInfoTitleCoverArtFunc = async () => {
    if (GlobalStateContext.PROXY.getState().fetchListInfo) {
      await Axios.post("/api/titleCover", {
        input: GlobalStateContext.PROXY.getState().listID__PROXY,
      })
        .then((response) => {
          if (
            response.data.message.message === null ||
            response.data.message.message === undefined
          ) {
            if (
              response.data.message.images !== null &&
              response.data.message.images[0] !== undefined
            ) {
              this.setState((value) => {
                return {
                  ...value,
                  coverTitleURL: response.data.message?.images[0].image
                    ? response.data.message?.images[0].image
                    : null,
                };
              });
            }
          }
        })
        .catch((error) => {
          this.setState((value) => {
            return { ...value, coverTitleURL: null };
          });
        })
        .finally(() => {
          this.setState((value) => {
            return { ...value, isInfosFetched: true };
          });
        });
    }
  };
  generateGifHandler = async (event) => {
    this.setState((prev) => {
      return {
        ...prev,
        showLoadingSpinner: true,
      };
    });
    await Axios.post("/api/gifs", {
      input:
        GlobalStateContext.selectedList__PROXY.getState().selectedList__PROXY
          .title,
    })
      .then((response) => {
        this.setState((value) => {
          return { ...value, gifData: [...response.data.message.data] };
        });
        this.setState((value) => {
          return { ...value, isGifsLoaded: true };
        });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState((prev) => {
          return {
            ...prev,
            showLoadingSpinner: false,
          };
        });
      });
  };
  fetchInfoTitleFunc = async () => {
    if (GlobalStateContext.PROXY.getState().fetchListInfo) {
      await Axios.post("/api/titleInfo", {
        input: GlobalStateContext.PROXY.getState().listID__PROXY,
      })
        .then((response) => {
          GlobalStateContext.selectedList__PROXY.setState((prev) => {
            return {
              ...prev,
              selectedList__PROXY: response.data.message,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  render() {
    return (
      <section className={Styles["container"]}>
        <div className={Styles["info-container"]}>
          <strong className={Styles["info-heading"]}>Information</strong>
          <div className={Styles["info-details"]}>
            <div className={Styles["info-details-container"]}>
              <div className={Styles["info-value-container"]}>
                <div className={Styles["info-title-container"]}>
                  <span className={Styles["tags-title"]}>Title: </span>
                  <span className={Styles["tags-value"]}>
                    {GlobalStateContext.selectedList__PROXY.getState()
                      .selectedList__PROXY
                      ? GlobalStateContext.selectedList__PROXY.getState()
                          .selectedList__PROXY.title
                        ? GlobalStateContext.selectedList__PROXY.getState()
                            .selectedList__PROXY.title.length > 20
                          ? GlobalStateContext.selectedList__PROXY
                              .getState()
                              .selectedList__PROXY.title.substring(0, 20) +
                            "..."
                          : GlobalStateContext.selectedList__PROXY.getState()
                              .selectedList__PROXY.title
                          ? GlobalStateContext.selectedList__PROXY.getState()
                              .selectedList__PROXY.title
                          : "**NO DATA**"
                        : "**NO DATA**"
                      : "Please Select a track!"}
                  </span>
                </div>
                <div className={Styles["info-artist-container"]}>
                  <span className={Styles["tags-title"]}>Artists: </span>
                  <span className={Styles["tags-value"]}>
                    {GlobalStateContext.selectedList__PROXY.getState()
                      .selectedList__PROXY
                      ? GlobalStateContext.selectedList__PROXY
                          .getState()
                          .selectedList__PROXY["artist-credit"]?.map(
                            (element, index, array) => {
                              return (
                                <span key={index}>
                                  {(
                                    element.name +
                                    (index !== array.length - 1 ? ", " : "")
                                  ).length > 20
                                    ? (
                                        element.name +
                                        (index !== array.length - 1 ? ", " : "")
                                      ).substring(0, 20) + "..."
                                    : element.name +
                                      (index !== array.length - 1 ? ", " : "")}
                                </span>
                              );
                            }
                          ) || "**NO DATA**"
                      : "Please Select a track!"}
                  </span>
                </div>
                <div className={Styles["info-label-container"]}>
                  <span className={Styles["tags-title"]}>Label: </span>
                  <span className={Styles["tags-value"]}>
                    {GlobalStateContext.selectedList__PROXY.getState()
                      .selectedList__PROXY !== null
                      ? GlobalStateContext.selectedList__PROXY.getState()
                          .selectedList__PROXY["label-info"]
                        ? GlobalStateContext.selectedList__PROXY
                            .getState()
                            .selectedList__PROXY["label-info"].map(
                              (element, index, array) => {
                                return (
                                  <span key={index}>
                                    {element.label.name
                                      ? (
                                          element.label.name +
                                          (index !== array.length - 1
                                            ? ", "
                                            : "")
                                        ).length > 20
                                        ? (
                                            element.label.name +
                                            (index !== array.length - 1
                                              ? ", "
                                              : "")
                                          ).substring(0, 20) + "..."
                                        : (
                                            element.label.name +
                                            (index !== array.length - 1
                                              ? ", "
                                              : "")
                                          ).length === 0
                                        ? "**NO DATA**"
                                        : element.label.name +
                                          (index !== array.length - 1
                                            ? ", "
                                            : "")
                                      : "**NO DATA**"}
                                  </span>
                                );
                              }
                            )
                        : "**NO DATA**"
                      : "Please Select a track!"}
                  </span>
                </div>
                <div className={Styles["info-date-container"]}>
                  <span className={Styles["tags-title"]}>Date: </span>
                  <span className={Styles["tags-value"]}>
                    {GlobalStateContext.selectedList__PROXY.getState()
                      .selectedList__PROXY
                      ? GlobalStateContext.selectedList__PROXY.getState()
                          .selectedList__PROXY.date || "**NO DATA**"
                      : "Please Select a track!"}
                  </span>
                </div>
              </div>
              <div className={Styles["info-thumbnail-container"]}>
                <Image
                  src={
                    this.state.coverTitleURL ? this.state.coverTitleURL : cdIMG
                  }
                  height={250}
                  width={250}
                  alt="a-cd-image"
                  priority
                ></Image>
              </div>
            </div>
            <div className={Styles["gifs-generate-btn-container"]}>
              <button
                type="button"
                className={Styles["generate-btn"]}
                onClick={this.generateGifHandler}
                disabled={this.state.showGenerateButton ? false : true}
              >
                {this.state.showLoadingSpinner && (
                  <LoadingSpinner></LoadingSpinner>
                )}
                {!this.state.showLoadingSpinner && "Generate"}
              </button>
            </div>
          </div>
        </div>
        <div className={Styles["gifs-container"]}>
          <div className={Styles["gifs-image-container"]}>
            <Link
              href={
                this.state.isGifsLoaded && this.state.gifData[0]
                  ? this.state.gifData[0].images.original.url
                    ? this.state.gifData[0].images.original.url
                    : "https://media.giphy.com/media/FWi1f9Wn2hubC/giphy.gif"
                  : "https://media.giphy.com/media/FWi1f9Wn2hubC/giphy.gif"
              }
              target="__blank"
            >
              
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default SearchInfoAndGIFs;
