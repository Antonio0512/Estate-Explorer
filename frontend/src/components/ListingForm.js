import {useContext, useState} from "react";
import {TailSpin} from "react-loader-spinner"
import {ListingContext} from "../contexts/listingContext";

export const ListingForm = ({currentPage, formData, updateFormData, onFormSubmit}) => {
    const {getSearchListings} = useContext(ListingContext)

    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const {name, value, type, checked} = e.target;
        const newValue = type === "checkbox" ? (checked ? "true" : "false") : value;
        updateFormData({...formData, [name]: newValue});
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await getSearchListings(formData, currentPage);
            onFormSubmit();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <form className='listingform' method="post" onSubmit={e => onSubmit(e)}>
            <div className='row'>
                <div className='col-1-of-6'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='sale_type'>Sale or Rent</label>
                        <select id="sale_type" className='listingform__select' name='sale_type'
                                onChange={e => onChange(e)}
                                value={formData.sale_type}>
                            <option>For Sale</option>
                            <option>For Rent</option>
                        </select>
                    </div>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='sqft'>Sqft</label>
                        <select id="sqft" className='listingform__select' name='sqft' onChange={e => onChange(e)}
                                value={formData.sqft}>
                            <option>1000+</option>
                            <option>1200+</option>
                            <option>1500+</option>
                            <option>2000+</option>
                            <option>Any</option>
                        </select>
                    </div>
                </div>

                <div className='col-1-of-6'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='price'>Minimum Price</label>
                        <select id="price" className='listingform__select' name='price' onChange={e => onChange(e)}
                                value={formData.price}>
                            <option>$0+</option>
                            <option>$200,000+</option>
                            <option>$400,000+</option>
                            <option>$600,000+</option>
                            <option>$800,000+</option>
                            <option>$1,000,000+</option>
                            <option>$1,200,000+</option>
                            <option>$1,500,000+</option>
                            <option>Any</option>
                        </select>
                    </div>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='days_listed'>Days Listed</label>
                        <select id="days_listed" className='listingform__select' name='days_listed'
                                onChange={e => onChange(e)}
                                value={formData.days_listed}>
                            <option>1 or less</option>
                            <option>2 or less</option>
                            <option>5 or less</option>
                            <option>10 or less</option>
                            <option>20 or less</option>
                            <option>Any</option>
                        </select>
                    </div>
                </div>

                <div className='col-1-of-6'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='bedrooms'>Bedrooms</label>
                        <select id="bedrooms" className='listingform__select' name='bedrooms'
                                onChange={e => onChange(e)}
                                value={formData.bedrooms}>
                            <option>0+</option>
                            <option>1+</option>
                            <option>2+</option>
                            <option>3+</option>
                            <option>4+</option>
                            <option>5+</option>
                        </select>
                    </div>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='has_photos'>Has Photos</label>
                        <select id="has_photos" className='listingform__select' name='has_photos'
                                onChange={e => onChange(e)}
                                value={formData.has_photos}>
                            <option>1+</option>
                            <option>3+</option>
                            <option>5+</option>
                            <option>10+</option>
                            <option>15+</option>
                        </select>
                    </div>
                </div>

                <div className='col-1-of-6'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='home_type'>Home Type</label>
                        <select id="home_type" className='listingform__select' name='home_type'
                                onChange={e => onChange(e)}
                                value={formData.home_type}>
                            <option>House</option>
                            <option>Condo</option>
                            <option>Townhouse</option>
                        </select>
                    </div>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='keywords'>Keywords</label>
                        <input id="keywords" className='listingform__input' name='keywords' type='text'
                               onChange={e => onChange(e)}
                               value={formData.keywords}/>
                    </div>
                </div>

                <div className='col-1-of-6'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='bathrooms'>Baths</label>
                        <select id="bathrooms" className='listingform__select' name='bathrooms'
                                onChange={e => onChange(e)}
                                value={formData.bathrooms}>
                            <option>0+</option>
                            <option>1+</option>
                            <option>2+</option>
                            <option>3+</option>
                            <option>4+</option>
                        </select>
                    </div>
                    <div className='listingform__altsection'>
                        <label className='listingform__label' htmlFor='open_house'>Open Houses</label>
                        <input id="open_house" className='listingform__checkbox' name='open_house' type='checkbox'
                               onChange={e => onChange(e)} value={formData.open_house}/>
                    </div>
                </div>

                <div className='col-1-of-6'>
                    {loading ?
                        <div className='listingform__loader'>
                            <TailSpin
                                type="Oval"
                                color="#424242"
                                height={50}
                                width={50}
                            />
                        </div> :
                        <button className='listingform__button listingform__button--primary'>Save</button>
                    }
                </div>
            </div>
        </form>
    );
};
