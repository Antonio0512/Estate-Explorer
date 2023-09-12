import React, {useState} from "react";
import {Helmet} from "react-helmet";
import {Listings} from "./Listings";
import {Pagination} from "../components/Pagination";
import {ListingForm} from "../components/ListingForm"

export const Home = () => {
    const [listings, setListings] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [listingsPerPage, setListingsPerPage] = useState(3)
    const [active, setActive] = useState(2)

    const indexOfLastListing = currentPage * listingsPerPage;
    const indexOfFirstListing = indexOfLastListing - listingsPerPage;
    const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

    const visitPage = (page) => {
        setCurrentPage(page);
        setActive(page);
    };

    const previous_number = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
            setActive(currentPage - 1);
        }
    };

    const next_number = () => {
        if (currentPage !== Math.ceil(listings.length / 3)) {
            setCurrentPage(currentPage + 1);
            setActive(currentPage + 1);
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
                <ListingForm setListings={setListings}/>
            </section>
            <section className="home__listings">
                <Listings listings={currentListings}/>
            </section>
            <section className="home__pagination">
                <div className="row">
                    {
                        listings && (
                            <Pagination
                                itemsPerPage={listingsPerPage}
                                count={listings.length}
                                visitPage={visitPage}
                                previous={previous_number}
                                next={next_number}
                                active={active}
                                setActive={setActive}
                            />
                        )
                    }
                </div>
            </section>
        </main>
    );
}