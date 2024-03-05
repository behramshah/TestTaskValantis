import { useState, useCallback } from 'react';
import Table from '../table/Table';
import Filter from '../filter/Filter';

import axios from 'axios';
import md5 from 'crypto-js/md5';
import { endpoint, authString, Resultsfilter } from '../Utils';
import './list-style.css';

function List() {
  const authorizationToken = md5(authString).toString();
  const [itemIds, setItemIds] = useState([]);
  const [showItems, setShowItems] = useState(false);
  const [advanceSearch, setAdvanceSearch] = useState(false);

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
    setAdvanceSearch(false);
    await fetchItemIds();
    setShowItems(true);
  }

  const handleFilter = () => {
    setShowItems(false);
    setAdvanceSearch(true);
  }

  const handleZero = () => {
    setShowItems(false);
    setAdvanceSearch(false);
  }

  return (
    <>
      <p>Добро пожаловать на наш веб-сайт! Если вы хотите ознакомиться с нашим ассортиментом продуктов,
         просто нажмите кнопку “Показать все”. А если у вас есть конкретные предпочтения по бренду, бюджету или типу товара, 
        воспользуйтесь нашими функциями расширенного поиска. Мы рады помочь вам найти именно то, что вам нужно! 
      </p>
      <div id='button_container'>
        <button className='options-button' onClick={handleShow}>Показать всё</button>        
        <button className='options-button' onClick={handleFilter}>Расширенный поиск</button>        
        <button className='options-button' onClick={handleZero}>скрыть все</button>        
      </div>
      {showItems ? <Table ids={itemIds} hashAuth={authorizationToken}/> : null}
      {advanceSearch ? <Filter authorizationToken={authorizationToken} /> : null}
    </>
  );
}

export default List;