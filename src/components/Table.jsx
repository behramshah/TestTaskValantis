import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { endpoint, PageList, FilterGoods } from './Utils';

function Table(props) {
  const { currentPage, ids, hashAuth } = props;
  const [filteredItems, setFilteredItems] = useState([]);

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
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <h1>Table {currentPage}</h1>
      <ol>
        {filteredItems.map((item) => (<li key={item.id}>{item.price}</li>))}
      </ol>
    </>
  );
}

Table.propTypes = {
  ids: PropTypes.array.isRequired,
  hashAuth: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Table;
