import React, { Fragment } from "react";
import Pagination from "react-js-pagination";
import GlobalStateContext from "../../state/state";
import Styles from "./ListPagination.module.css";
import PageDetails from "./PageDetails";

class ListPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 0,
      totalItemsCount: 0,
      pageDetailsKeyCount: 0,
      paginationRenderCount: 1,
    };
  }
  componentDidMount() {
    this.setState(state => {
      return {
      ...state,
      totalItemsCount: GlobalStateContext.PROXY.getState().onlyCurrentMixedData.length,}
    });
    GlobalStateContext.PROXY.subscribe((proxyState) => {
      this.setState((state) => {
        return {
          ...state,
          totalItemsCount: proxyState.onlyCurrentMixedData.length,
        };
      });
    });
    GlobalStateContext.PAGINATION_PROXY.subscribe((state) => {
      this.setState((state) => {
        return {
          ...state,
          pageDetailsKeyCount: state.pageDetailsKeyCount + 1,
        };
      });
    });
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    GlobalStateContext.PAGINATION_PROXY.setState((state) => {
      return {
        ...state,
        activePage: pageNumber,
      };
    });
  }

  render() {
    return (
      <Fragment>
        {GlobalStateContext.PROXY.getState().isListFetched &&
          ((GlobalStateContext.PROXY.getState().onlyCurrentMixedData.length ===
            0 &&
            GlobalStateContext.PROXY.getState().onlyCurrentMixedData[0] ===
              undefined) ||
            null) && (
            <strong className={Styles["nodata"]}>
              No Data Found! Try Something Else.
            </strong>
          )}
        {GlobalStateContext.PROXY.getState().isListFetched &&
          GlobalStateContext.PROXY.getState().onlyCurrentMixedData.length !==
            0 && (
            <>
              <PageDetails
                key={this.state.activePage + this.state.pageDetailsKeyCount}
                anotherKey={this.state.activePage}
              ></PageDetails>
              <Pagination
                key={this.state.paginationRenderCount}
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={this.state.totalItemsCount}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
              ></Pagination>
            </>
          )}
      </Fragment>
    );
  }
}
export default ListPagination;
