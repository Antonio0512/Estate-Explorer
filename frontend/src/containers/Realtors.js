import {useContext, useEffect} from "react";
import {RealtorContext} from "../contexts/realtorContext";
import {RealtorsCard} from "../components/RealtorsCard"
import {Pagination} from "../components/Pagination";
import {Helmet} from "react-helmet";

export const Realtors = () => {
    const {realtors, getAllRealtors, currentPage, totalPages, setCurrentPage} = useContext(RealtorContext)

    useEffect(() => {
        const fetchRealtors = async () => {
            try {
                await getAllRealtors(currentPage);
            } catch (error) {
                console.error(error)
            }
        };
        fetchRealtors()
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
                <title>Realest Estate - Realtors</title>
                <meta
                    name='description'
                    content='Listings page'
                />
            </Helmet>
            <section className='listings__listings'>
                <div className='row'>
                    {realtors ? (
                        realtors.map((realtor) => (
                            <div className='col-1-of-3' key={realtor.id}>
                                <RealtorsCard
                                    realtor={realtor}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No realtors available.</p>
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
