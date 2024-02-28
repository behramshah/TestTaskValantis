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
