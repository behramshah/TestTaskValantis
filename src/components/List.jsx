import { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'crypto-js/md5';
import { endpoint, authString, Resultsfilter } from './Utils';
import Table from './Table';

function List() {
  const authorizationToken = md5(authString).toString();
  const [itemIds, setItemIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showItems, setShowItems] = useState(false);

  const fetchData = async () => {
    try {
      const requestData = { action: 'get_ids' };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': authorizationToken,
        },
      };

      const response = await axios.post(endpoint, requestData, config);
      const filteredResults = Resultsfilter(response.data.result);
      setItemIds(filteredResults);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showItems]);

  const goBack = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goForward = () => {
    if (itemIds.length - currentPage * 50 > 0) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleShow = () => {
    setShowItems(!showItems)
  }

  return (
    <>
      {showItems ? <Table ids={itemIds} currentPage={currentPage} hashAuth={authorizationToken}/> : null}
      <div>
        <button onClick={handleShow}>Show Items</button>
        <button onClick={goBack}>Previous</button>
        <p>{currentPage}</p>
        <button onClick={goForward}>Next</button>
      </div>
    </>
  );
}

export default List;