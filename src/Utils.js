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
    const end = start+49;
    const pageList = ids.slice(start, end)
    return pageList;
}
