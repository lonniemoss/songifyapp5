import { create } from "zustand";

const PROXY = create(() => ({
  allMixedData__PROXY: [],
  onlyCurrentMixedData: [],
  isListFetched: false,
  titleInfoStateUpdate: false,
  selectButtonClassName__PROXY: null,
  listID__PROXY: null,
  fetchListInfo: false,
  refreshInfoComponent: 0,
  selectedButtonEvent__PROXY: null,
  isTitleInfoFetched__PROXY: false,
}));
const selectedList__PROXY = create(() => ({
  selectedList__PROXY: null,
}));
const PAGINATION_PROXY = create(() => ({
  dividePagesIn: 10,
  dividedPagesList: [],
  activePage: 0,
}));
const FAVOURITEBUTTONLISTITEMS_PROXY = create((set) => ({
  favouriteLists__Item__PROXY: [],
  setFavouriteLists__Item__PROXY: async (data) => {
    set((state) => ({
      ...state,
      favouriteLists__Item__PROXY: [...data],
    }));
    let returnValue = false;
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });
    return returnValue;
  },
}));
const FAVOURITEBUTTONLIST_PROXY = create((set) => ({
  favouriteList__PROXY: [],
  setFavouriteList__PROXY: async (data) => {
    set((state) => ({
      ...state,
      favouriteList__PROXY: [data],
    }));
    let returnValue = false;
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });
    return returnValue;
  },
  setFilteredFavouriteList__PROXY: async (data) => {
    set((state) => ({
      ...state,
      favouriteList__PROXY: [...data],
    }));
    let returnValue = false;
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });
    return returnValue;
  },
  setOtherFavouriteList__PROXY: async (data) => {
    set((state) => {
      return {
        favouriteList__PROXY: [...state.favouriteList__PROXY, ...data],
      };
    });
    let returnValue = false;
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });
    return returnValue;
  },
  setAnotherFavouriteList__PROXY: async (data) => {
    set((state) => {
      return {
        favouriteList__PROXY: [
          ...FAVOURITEBUTTONLIST_PROXY.getState().favouriteList__PROXY,
          data,
        ],
      };
    });
    let returnValue = false;
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });
    return returnValue;
  },
}));
export default {
  PROXY,
  PAGINATION_PROXY,
  selectedList__PROXY,
  FAVOURITEBUTTONLISTITEMS_PROXY,
  FAVOURITEBUTTONLIST_PROXY,
};
