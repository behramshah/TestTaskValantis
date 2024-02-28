import { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'crypto-js/md5';
import { endpoint, authString, Resultsfilter, PageList, FilterGoods } from './Utils';

function List () {    
  const hashAuth = md5(authString).toString();

  const [ids, setIds] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [goods, SetGoods] = useState([]);

  useEffect(()=>{
    const requestData = {
      action: 'get_ids',
    };
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': hashAuth,
      },
    };

    axios.post(endpoint, requestData, config)
    .then((response) => {
      const filteredResults = Resultsfilter(response.data.result);
      setIds(filteredResults);
      setCurrentPage(1)
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  },[])

  useEffect (()=>{
    const parameters = PageList(ids, currentPage);
    const requestData = {
      "action": "get_items",
      "params": {"ids": parameters}
    };
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': hashAuth,
      },
    };

    axios.post(endpoint, requestData, config)
    .then((response) => {
      const filteredGoods = FilterGoods(response.data.result);
      SetGoods(filteredGoods)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  },[currentPage])

  const goBack = () => {
    if(currentPage !== 1){
      setCurrentPage(currentPage-1)
    }
  }

  const goForward = () => {
    if(ids.length - currentPage*50 > 0){
      setCurrentPage(currentPage+1)
    }
  }

    return (
      <>
        <h1>Hello valantis</h1>
        <div>
          <button onClick={goBack}>Previous</button>
          <p>{currentPage}</p>
          <button onClick={goForward}>Next</button>
        </div>
      </>
    )
}

export default List;