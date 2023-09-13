import {useContext} from "react";
import {Helmet} from "react-helmet";
import {Listings} from "../components/Listings";
import {Pagination} from "../components/Pagination";
import {ListingForm} from "../components/ListingForm"
import {ListingContext} from "../contexts/listingContext";

export const Home = () => {
    const { searchCurrentPage, searchTotalPages, setSearchCurrentPage, searchListings } = useContext(ListingContext);

    const itemsPerPage = 3;
    const previousPage = () => {
        if (searchCurrentPage > 1) {
            setSearchCurrentPage(searchCurrentPage - 1);
        }
    };

    const nextPage = () => {
        if (searchCurrentPage < searchTotalPages) {
            setSearchCurrentPage(searchCurrentPage + 1);
        }
    };

    // Calculate the start and end indices for the current page
    const startIndex = (searchCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the searchListings array to display only items for the current page
    const displayedListings = searchListings.slice(startIndex, endIndex);


    return (
        <main className="home">
            <Helmet>
                <title>Estate Explorer - Home</title>
                <meta
                    name="description"
                    content="Estate Explorer Home Page"
                />
            </Helmet>
            <section className="home__form">
                <ListingForm/>
            </section>
            <section className="home__listings">
                <Listings listings={displayedListings}/>
            </section>
            <section className='home__pagination'>
                <div className='row'>
                    {searchListings.length !== 0 ? (
                        <Pagination
                            itemsPerPage={3}
                            count={searchTotalPages}
                            visitPage={setSearchCurrentPage}
                            previous={previousPage}
                            next={nextPage}
                            active={searchCurrentPage}
                            setActive={setSearchCurrentPage}
                        />
                    ) : null}
                </div>
            </section>
        </main>
    );
}