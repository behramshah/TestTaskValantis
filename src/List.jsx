import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'crypto-js/md5';
import { Resultsfilter } from './Utils';

function List () {  

  const endpoint = 'http://api.valantis.store:40000/';
  const password = 'Valantis';
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const authString = `${password}_${timestamp}`;  
  const hashAuth = md5(authString).toString();

  const [ids, setIds] = useState([]);

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
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  },[])

    return (
      <>
        <h1>Hello valantis</h1>
      </>
    )
}

export default List;