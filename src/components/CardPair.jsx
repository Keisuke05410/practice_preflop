import Card from './Card';

const animationStyles = {
  scale: {
    visible: {
      transform: 'scale(1)',
      opacity: 1,
      zIndex: 2,
      visibility: 'visible',
      pointerEvents: 'auto',
    },
    hidden: {
      transform: 'scale(0)',
      opacity: 0,
      zIndex: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    },
    transitionVisible: 'transform 0.25s ease-out, opacity 0.25s ease-out, visibility 0s linear 0s',
    transitionHidden: 'transform 0.25s ease-out, opacity 0.25s ease-out, visibility 0s linear 0.25s',
  },
  slide: {
    visible: {
      transform: 'translateX(0)',
      opacity: 1,
      zIndex: 2,
      visibility: 'visible',
      pointerEvents: 'auto',
    },
    hidden: {
      transform: 'translateX(-100%)',
      opacity: 0,
      zIndex: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    },
    transitionVisible: 'transform 0.3s ease-out, opacity 0.3s ease-out, visibility 0s linear 0s',
    transitionHidden: 'transform 0.3s ease-out, opacity 0.3s ease-out, visibility 0s linear 0.3s',
  },
  fade: {
    visible: {
      opacity: 1,
      zIndex: 2,
      visibility: 'visible',
      pointerEvents: 'auto',
    },
    hidden: {
      opacity: 0,
      zIndex: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    },
    transitionVisible: 'opacity 0.3s ease-out, visibility 0s linear 0s',
    transitionHidden: 'opacity 0.3s ease-out, visibility 0s linear 0.3s',
  },
  flip: {
    visible: {
      transform: 'rotateY(0deg)',
      opacity: 1,
      zIndex: 2,
      visibility: 'visible',
      pointerEvents: 'auto',
    },
    hidden: {
      transform: 'rotateY(90deg)',
      opacity: 0,
      zIndex: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    },
    transitionVisible: 'transform 0.3s ease-out, opacity 0.3s ease-out, visibility 0s linear 0s',
    transitionHidden: 'transform 0.3s ease-out, opacity 0.3s ease-out, visibility 0s linear 0.3s',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
  },
};

const CardPair = ({ cards, isVisible, animationType = 'scale' }) => {
  const config = animationStyles[animationType];
  const stateStyle = isVisible ? config.visible : config.hidden;
  const transition = isVisible ? config.transitionVisible : config.transitionHidden;

  const style = {
    ...stateStyle,
    transition,
    ...(config.transformStyle && { transformStyle: config.transformStyle }),
    ...(config.backfaceVisibility && { backfaceVisibility: config.backfaceVisibility }),
  };

  return (
    <div className="card-pair-layer" style={style}>
      {cards.map((card, index) => (
        <Card
          key={`${card.rank}-${card.suit}-${index}`}
          rank={card.rank}
          suit={card.suit}
        />
      ))}
    </div>
  );
};

export default CardPair;
