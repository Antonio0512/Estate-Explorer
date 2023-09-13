import {Helmet} from 'react-helmet';
import {Card} from '../components/Card';
import {ListingContext} from '../contexts/listingContext';
import {useContext, useEffect} from 'react';
import {Pagination} from "../components/Pagination";

export const Listings = () => {
    const {listings, getAllListings, currentPage, totalPages, setCurrentPage} = useContext(ListingContext);

    useEffect(() => {
        getAllListings(currentPage);
    }, [currentPage]);

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
        <main className='listings'>
            <Helmet>
                <title>Realest Estate - Listings</title>
                <meta
                    name='description'
                    content='Listings page'
                />
            </Helmet>
            <section className='listings__listings'>
                <div className='row'>
                    {listings ? (
                        listings.map((listing) => (
                            <Card
                                key={listing.slug}
                                listing={listing}
                            />
                        ))
                    ) : (
                        <p>No listings available.</p>
                    )}
                </div>
            </section>
            <section className='listings__pagination'>
                <div className='row'>
                    <Pagination
                        itemsPerPage={3}
                        count={totalPages}
                        visitPage={setCurrentPage}
                        previous={previousPage}
                        next={nextPage}
                        active={currentPage}
                        setActive={setCurrentPage}
                    />
                </div>
            </section>
        </main>
    );
};
