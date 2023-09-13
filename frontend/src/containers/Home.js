import React, {useContext} from "react";
import {Helmet} from "react-helmet";
import {Listings} from "../components/Listings";
import {Pagination} from "../components/Pagination";
import {ListingForm} from "../components/ListingForm"
import {ListingContext} from "../contexts/listingContext";

export const Home = () => {
    const {currentPage, totalPages, setCurrentPage, listings} = useContext(ListingContext);

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
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
                <ListingForm/>
            </section>
            <section className="home__listings">
                <Listings/>
            </section>
            <section className='listings__pagination'>
                <div className='row'>
                    {listings.length !== 0 ? (
                        <Pagination
                            itemsPerPage={3}
                            count={totalPages}
                            visitPage={setCurrentPage}
                            previous={previousPage}
                            next={nextPage}
                            active={currentPage}
                            setActive={setCurrentPage}
                        />
                    ) : null}
                </div>
            </section>
        </main>
    );
}