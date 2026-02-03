import { isRedSuit } from '../utils/cards';
import './Card.css';

const Card = ({ rank, suit, isFlipping, animationDelay = 0 }) => {
  const colorClass = isRedSuit(suit) ? 'red' : 'black';

  return (
    <div
      className={`card-wrapper ${isFlipping ? 'flipping' : ''}`}
      style={{ '--animation-delay': `${0.4 + animationDelay}s` }}
    >
      <div className="card-inner">
        {/* Front of card */}
        <div className={`card card-front ${colorClass}`}>
          <div className="card-texture" />
          <div className="card-border-accent" />
          <div className="card-corner top-left">
            <span className="card-rank">{rank}</span>
            <span className="card-suit-small">{suit}</span>
          </div>
          <span className="card-suit-center">{suit}</span>
          <div className="card-corner bottom-right">
            <span className="card-rank">{rank}</span>
            <span className="card-suit-small">{suit}</span>
          </div>
          <div className="card-shine" />
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
