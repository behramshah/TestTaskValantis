export const endpoint = 'http://api.valantis.store:40000/';
export const password = 'Valantis';
export const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
export const authString = `${password}_${timestamp}`;  

export const Resultsfilter = (results) => {
    const uniqueIds = {};
    const filteredArray = results.filter((id) => {
        if (!uniqueIds[id]) {
          uniqueIds[id] = true;
          return true;
        }
        return false;
    });

    return filteredArray;

}

export const PageList = (ids, currentpage) => {
    const start = currentpage*50 - 50
    const end = start+50;
    const pageList = ids.slice(start, end)
    return pageList;
}

export const FilterGoods = (goods) => {
  const uniquegoods = {};
  const filteredGoods = goods.filter((good) => {
    if (!uniquegoods[good.id]) {
      uniquegoods[good.id] = true;
      return true;
    }
    return false;
  });

  return filteredGoods;
}
