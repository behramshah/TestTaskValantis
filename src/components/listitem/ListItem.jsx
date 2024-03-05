import PropTypes from 'prop-types';

import './Listitem-style.css';

const ListItem = ({ item }) => {
  const noname = "имя не было добавлено";
  const nobrand = "неизвестный бренд";
  const rub = "руб"
  
  return (
    <div className="list-item">
      <span className="item-id">{item.id}</span>
      <span className="item-details">{item.product ? item.product : noname}</span>
      <span className="item-details">{item.price} {rub}</span>
      <span className="item-details">{item.brand ? item.brand : nobrand}</span>
    </div>
  );
};

ListItem.propTypes = {
    item: PropTypes.shape({
        brand: PropTypes.string,
        id: PropTypes.string,
        product: PropTypes.string,
        price: PropTypes.number,
      }),
  };

export default ListItem;