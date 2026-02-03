import { useState, useEffect } from 'react';
import Card from './Card';

const animationStyles = {
  scale: {
    visible: {
      transform: 'scale(1)',
      opacity: 1,
      zIndex: 2,
    },
    hidden: {
      transform: 'scale(0)',
      opacity: 0,
      zIndex: 1,
    },
    transition: 'transform 0.25s ease-out, opacity 0.25s ease-out',
  },
  slide: {
    visible: {
      transform: 'translateX(0)',
      opacity: 1,
      zIndex: 2,
    },
    hidden: {
      transform: 'translateX(-100%)',
      opacity: 0,
      zIndex: 1,
    },
    transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
  },
  fade: {
    visible: {
      opacity: 1,
      zIndex: 2,
    },
    hidden: {
      opacity: 0,
      zIndex: 1,
    },
    transition: 'opacity 0.3s ease-out',
  },
  flip: {
    visible: {
      transform: 'rotateY(0deg)',
      opacity: 1,
      zIndex: 2,
    },
    hidden: {
      transform: 'rotateY(90deg)',
      opacity: 0,
      zIndex: 1,
    },
    transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
  },
};

const CardPair = ({ cards, isVisible, animationType = 'scale' }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 次のフレームで ready にする（transition を正しくトリガーするため）
    const raf = requestAnimationFrame(() => {
      setIsReady(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const config = animationStyles[animationType];
  // isReady になるまでは hidden、その後は isVisible に従う
  const shouldShow = isReady && isVisible;
  const stateStyle = shouldShow ? config.visible : config.hidden;

  const style = {
    ...stateStyle,
    transition: config.transition,
    ...(config.transformStyle && { transformStyle: config.transformStyle }),
    ...(config.backfaceVisibility && { backfaceVisibility: config.backfaceVisibility }),
  };

  return (
    <div className="card-pair-layer" style={style}>
      {cards.map((card, index) => (
        <Card key={index} rank={card.rank} suit={card.suit} />
      ))}
    </div>
  );
};

export default CardPair;
