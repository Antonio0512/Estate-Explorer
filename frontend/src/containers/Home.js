import {useContext, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {Listings} from "../components/Listings";
import {Pagination} from "../components/Pagination";
import {ListingForm} from "../components/ListingForm"
import {ListingContext} from "../contexts/listingContext";

export const Home = () => {
    const {
        getSearchListings,
        searchCurrentPage,
        searchTotalPages,
        setSearchCurrentPage,
    } = useContext(ListingContext);

    const [searchListings, setSearchListings] = useState(null)

    const [formData, setFormData] = useState({
        sale_type: "For Sale",
        price: "$0+",
        bedrooms: "0+",
        home_type: "House",
        bathrooms: "0+",
        sqft: "1000+",
        days_listed: "Any",
        has_photos: "1+",
        open_house: "false",
        keywords: "",
    });

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const result = await getSearchListings(formData, searchCurrentPage)
                    setSearchListings(result.results);
                } catch (error) {
                    console.error(error)
                }
            };
            fetchData();
        },
        [searchCurrentPage]);


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

    const updateFormData = (newFormData) => {
        setFormData(newFormData);
    };

    const handleFormSubmit = async () => {
        try {
            const result = await getSearchListings(formData, searchCurrentPage);
            setSearchListings(result.results);
        } catch (error) {
            console.error(error);
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
                <ListingForm
                    currentPage={searchCurrentPage}
                    formData={formData}
                    updateFormData={updateFormData}
                    onFormSubmit={handleFormSubmit}
                />
            </section>
            <section className="home__listings">
                <Listings/>
            </section>
            <section className='home__pagination'>
                <div className='row'>
                    {searchListings ? (
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