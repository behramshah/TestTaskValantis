import PropTypes from 'prop-types';
import { useState, useCallback} from 'react';
import { endpoint, Resultsfilter, ParamsForFilter } from '../Utils';
import Table from '../table/Table';
import axios from 'axios';
import './Filter-style.css';

function Filter (props){  
    const { authorizationToken } = props;
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState("");
    const [data, setData] = useState([]);

    const handleNameChange = (event) => {
        setProductName(event.target.value)
    }

    const handlePriceChange = (event) => {
        const inputPrice = parseFloat(event.target.value).toFixed(2);
        setPrice(Number(inputPrice));
        event.target.value
    };
      
    const handleBrandChange = (event) => {
        setBrand(event.target.value)
    }
    const searchItems = () => {
        fetchFilteredItems();
    }

    const fetchFilteredItems = useCallback(async () => {

        const params = ParamsForFilter(price, brand, productName)
        
        try {
            const requestData = {
                "action": "filter",
                "params": params
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth': authorizationToken
                },
            };
            
            const response = await axios.post(endpoint, requestData, config);
            const filteredResults = Resultsfilter(response.data.result);
            setData(filteredResults);          
        } catch (error) {
          console.error('Error:', error);
        }
    },[authorizationToken, price, brand, productName]);

    return (
        <>
            <div className="filter-container">
                <label htmlFor="product">имя продукта</label>
                <input type="text" name='product' placeholder='имя продукта' onChange={handleNameChange}/>
                <label htmlFor="price">цена</label>
                <input type="number" name='price' required placeholder='цена' onChange={handlePriceChange}/>
                <label htmlFor="brand">бренд</label>
                <input type="text" name='brand' placeholder='бренд' onChange={handleBrandChange}/>
                <button onClick={searchItems}>Поиск</button>
            </div>
            {data.length ? <Table ids={data} hashAuth={authorizationToken}/> : <h2>К сожалению, результатов, соответствующих вашему запросу, не найдено.</h2>}
        </>
        
    )
}

Filter.propTypes = {
    authorizationToken: PropTypes.string.isRequired,
};

export default Filter;