import { getCardImagePath } from '../utils/cards';

const Card = ({ rank, suit, isFlipping }) => {
  const imagePath = getCardImagePath(rank, suit);

  return (
    <div className={`card-wrapper ${isFlipping ? 'flipping' : ''}`}>
      <div className="card-inner">
        {/* Front of card */}
        <div className="card-base card-front">
          <img src={imagePath} alt={`${rank}${suit}`} className="w-full h-full object-cover rounded-xl" />
        </div>

        {/* Back of card */}
        <div className="card-base card-back">
          <div className="card-back-border" />
          <div className="card-back-logo">
            <span className="card-back-suit">♠</span>
            <span className="card-back-suit">♥</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
