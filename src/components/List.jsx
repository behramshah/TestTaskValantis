import { useState, useCallback } from 'react';
import axios from 'axios';
import md5 from 'crypto-js/md5';
import { endpoint, authString, Resultsfilter } from './Utils';
import Table from './Table';

function List() {
  const authorizationToken = md5(authString).toString();
  const [itemIds, setItemIds] = useState([]);
  const [showItems, setShowItems] = useState(false);

  const fetchItemIds = useCallback(async () => {
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
  },[authorizationToken]);

  const handleShow = async () => {
    await fetchItemIds();
    setShowItems(!showItems);
  }

  return (
    <>
      {showItems ? <Table ids={itemIds} hashAuth={authorizationToken}/> : null}
      <div>
        <button onClick={handleShow}>Показать всё</button>        
      </div>
    </>
  );
}

export default List;