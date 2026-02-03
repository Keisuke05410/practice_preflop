import { getCardImagePath } from '../utils/cards';

const Card = ({ rank, suit, isVisible }) => {
  const imagePath = getCardImagePath(rank, suit);

  return (
    <div className={`card-layer ${isVisible ? 'visible' : 'hidden'}`}>
      <img
        src={imagePath}
        alt={`${rank}${suit}`}
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  );
};

export default Card;
