import { getCardImagePath } from '../utils/cards';

const Card = ({ rank, suit }) => {
  const imagePath = getCardImagePath(rank, suit);

  return (
    <div className="card-item">
      <img
        src={imagePath}
        alt={`${rank}${suit}`}
        className="w-full h-full object-cover rounded-xl shadow-lg"
      />
    </div>
  );
};

export default Card;
