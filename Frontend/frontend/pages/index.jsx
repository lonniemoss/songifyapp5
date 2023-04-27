import Headers from "@/Components/Headers/Headers";
import SearchBox from "@/Components/SearchBox/SearchBox";
import { Fragment, useState } from "react";
import SearchInfo from "../Components/SearchInfo/SearchInfoAndGIFs";
import SearchInput from "../Components/UI/SearchInput/SearchInput";
import FavouriteSection from "../Components/FavouriteSection/FavouriteSection";
import ListPagination from "@/Components/ListPagination/ListPagination";

function Home() {
  const [onFavouriteSection, setOnFavouriteSection] = useState(false);
  const [refreshListPagination, setRefreshListPagination] = useState(0);
  const switchToFavourites = () => {
    setOnFavouriteSection(true);
    setRefreshListPagination((state) => state + 1);
  };
  const switchToHome = () => {
    setOnFavouriteSection(false);
    setRefreshListPagination((state) => state + 1);
  };
  return (
    <Fragment>
      <Headers favourites={{ switchToFavourites, switchToHome }}></Headers>
      <SearchBox>
        <Fragment>
          {onFavouriteSection && <FavouriteSection></FavouriteSection>}
          {!onFavouriteSection && <SearchInput></SearchInput>}
          {!onFavouriteSection && (
            <ListPagination key={refreshListPagination}></ListPagination>
          )}
        </Fragment>
        <SearchInfo></SearchInfo>
      </SearchBox>
      <style jsx global>{`
        #__next {
          height: 100%;
          width: 100%;
        }
      `}</style>
    </Fragment>
  );
}
export default Home;
