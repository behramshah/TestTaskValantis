import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { endpoint, PageList, FilterGoods } from './Utils';

function Table(props) {
  const { ids, hashAuth } = props;
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(async () => {
    try {
      const parameters = PageList(ids, currentPage);
      const requestData = {
        action: 'get_items',
        params: { ids: parameters },
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': hashAuth,
        },
      };

      const response = await axios.post(endpoint, requestData, config);
      const filteredGoods = FilterGoods(response.data.result);
      setFilteredItems(filteredGoods);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [currentPage, ids, hashAuth]);

  useEffect(() => {
    setFilteredItems([]);
    fetchData();
  }, [fetchData]);

  const goBack = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goForward = () => {
    if (ids.length - currentPage * 50 > 0) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <h1>Table {currentPage}</h1>
      <ol>
        {filteredItems.length ? filteredItems.map((item) => (<li key={item.id}>{`${item.price}, ${item.product}, ${item.id}`}</li>)) : <h2>loading...</h2>}
      </ol>
      <div>
        <button onClick={goBack}>Previous</button>
          <p>{currentPage}</p>
        <button onClick={goForward}>Next</button>
      </div>
    </>
  );
}

Table.propTypes = {
  ids: PropTypes.array.isRequired,
  hashAuth: PropTypes.string.isRequired,
};

export default Table;