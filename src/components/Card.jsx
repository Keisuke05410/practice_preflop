import { isRedSuit } from '../utils/cards';
import './Card.css';

const Card = ({ rank, suit, isFlipping }) => {
  const colorClass = isRedSuit(suit) ? 'red' : 'black';

  return (
    <div className={`card ${colorClass} ${isFlipping ? 'flipping' : ''}`}>
      <div className="card-corner top-left">
        <span className="card-rank">{rank}</span>
        <span className="card-suit-small">{suit}</span>
      </div>
      <span className="card-suit-center">{suit}</span>
      <div className="card-corner bottom-right">
        <span className="card-rank">{rank}</span>
        <span className="card-suit-small">{suit}</span>
      </div>
    </div>
  );
};

export default Card;
