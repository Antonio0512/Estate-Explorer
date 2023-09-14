import {useContext} from "react";
import {Helmet} from "react-helmet";
import {Listings} from "../components/Listings";
import {Pagination} from "../components/Pagination";
import {ListingForm} from "../components/ListingForm"
import {ListingContext} from "../contexts/listingContext";

export const Home = () => {
    const {
        searchCurrentPage,
        searchTotalPages,
        setSearchCurrentPage,
        searchListings
    } = useContext(ListingContext);

    const previousPage = async () => {
        if (searchCurrentPage > 1) {
            setSearchCurrentPage(searchCurrentPage - 1);
        }
    };

    const nextPage = () => {
        if (searchCurrentPage < searchTotalPages) {
            setSearchCurrentPage(searchCurrentPage + 1);
        }
    };

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
                <ListingForm currentPage={searchCurrentPage}/>
            </section>
            <section className="home__listings">
                <Listings/>
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