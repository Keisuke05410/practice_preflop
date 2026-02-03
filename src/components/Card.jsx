import { getCardImagePath } from '../utils/cards';
import './Card.css';

const Card = ({ rank, suit, isFlipping, animationDelay = 0 }) => {
  const imagePath = getCardImagePath(rank, suit);

  return (
    <div
      className={`card-wrapper ${isFlipping ? 'flipping' : ''}`}
      style={{ '--animation-delay': `${0.4 + animationDelay}s` }}
    >
      <div className="card-inner">
        {/* Front of card */}
        <div className="card card-front">
          <img src={imagePath} alt={`${rank}${suit}`} className="card-image" />
        </div>

        {/* Back of card */}
        <div className="card card-back">
          <div className="card-back-pattern" />
          <div className="card-back-border" />
          <div className="card-back-logo">
            <span className="card-back-suit spade">♠</span>
            <span className="card-back-suit heart">♥</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
