import {useState, useEffect, useContext} from 'react';
import {Helmet} from 'react-helmet';
import {RealtorContext} from '../contexts/realtorContext';
import House from '../assets/images/house asset.jpg';

export const About = () => {
    const {getTopRealtors, getAllRealtors} = useContext(RealtorContext);

    const [topSeller, setTopSeller] = useState([]);
    const [realtors, setRealtors] = useState([]);

    useEffect(() => {
        const getSellers = async () => {
            const topSellers = await getTopRealtors();
            setTopSeller(topSellers);
            const allSellers = await getAllRealtors(1);
            setRealtors(allSellers);
        };

        getSellers();
    }, []);


    return (
        <main className='about'>
            <Helmet>
                <title>Realest Estate - About</title>
                <meta name='description' content='About us'/>
            </Helmet>
            <header className='about__header'>
                <h1 className='about__heading'>About Realest Estate</h1>
            </header>
            <section className='about__info'>
                <div className='row'>
                    <div className='col-3-of-4'>
                        <h2 className='about__subheading'>We find the perfect home for you</h2>
                        <p className='about__paragraph'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae
                            sapien a diam eleifend faucibus. Suspendisse vitae sodales leo.
                            Proin hendrerit aliquam interdum. Maecenas tellus ante, ultrices
                            id justo id, venenatis hendrerit orci. Orci varius natoque
                            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                            Praesent aliquam condimentum ligula eget ullamcorper.
                        </p>
                        <div className='about__display'>
                            <img
                                className='about__display__image__main'
                                src={House}
                                alt=''
                            />
                        </div>
                        <p className='about__paragraph'>
                            Suspendisse gravida magna posuere purus laoreet, et elementum velit
                            placerat. Fusce at convallis erat. Curabitur placerat eros eu
                            interdum lacinia. Nulla facilisi. Duis pretium tristique porta.
                            Donec vehicula est a massa interdum vehicula. Lorem ipsum dolor sit
                            amet, consectetur adipiscing elit. Mauris malesuada lacus mauris,
                            eu ultrices neque egestas eu. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos. Morbi elementum
                            enim vitae purus pulvinar tincidunt. Aenean id viverra leo, non
                            vehicula odio. Vestibulum volutpat a nulla at mattis. Nam cursus
                            semper sapien, eu consequat lacus iaculis vel.
                        </p>
                    </div>
                    <div className='col-1-of-4'>
                        {topSeller.slice(0, 3).map((seller) => (
                            <div className='about__display' key={seller.id}>
                                <img className='about__display__image' src={seller.photo} alt=''/>
                                <h3 className='about__topseller'>Top Seller:</h3>
                                <p className='about__realtor'>{seller.name}</p>
                                <p className='about__contact'>{seller.phone}</p>
                                <p className='about__contact'>{seller.email}</p>
                            </div>
                        ))};
                    </div>
                </div>
            </section>
            <section className='about__team'>
                <div className='row'>
                    <h2 className='about__subheading'>Meet our awesome team!</h2>
                </div>
                <div className='row'>
                    {realtors.slice(0, 3).map((realtor) => (
                        <div className='col-1-of-3' key={realtor.id}>
                            <div className='about__display'>
                                <img className='about__display__image' src={realtor.photo} alt=''/>
                            </div>
                            <h3 className='about__realtor'>{realtor.name}</h3>
                            <p className='about__contact'>{realtor.phone}</p>
                            <p className='about__contact'>{realtor.email}</p>
                            <p className='about__about'>{realtor.description}</p>
                        </div>
                    ))};
                </div>
            </section>
        </main>
    );
};
