import { getCardImagePath } from '../utils/cards';

const Card = ({ rank, suit, isAnimating, onAnimationEnd }) => {
  const imagePath = getCardImagePath(rank, suit);

  return (
    <div
      className={`card ${isAnimating ? 'fade-out' : 'fade-in'}`}
      onAnimationEnd={onAnimationEnd}
    >
      <img
        src={imagePath}
        alt={`${rank}${suit}`}
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  );
};

export default Card;
