import { getCardImagePath } from '../utils/cards';

const Card = ({ rank, suit, flipPhase, onAnimationEnd }) => {
  const imagePath = getCardImagePath(rank, suit);

  const getFlipClass = () => {
    if (flipPhase === 'out') return 'flip-out';
    if (flipPhase === 'in') return 'flip-in';
    return '';
  };

  return (
    <div className={`card-wrapper ${getFlipClass()}`}>
      <div className="card-inner" onAnimationEnd={onAnimationEnd}>
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
