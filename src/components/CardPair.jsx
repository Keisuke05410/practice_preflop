import Card from './Card';

const CardPair = ({ cards, isVisible }) => {
  return (
    <div className={`card-pair-layer ${isVisible ? 'visible' : 'hidden'}`}>
      {cards.map((card, index) => (
        <Card key={index} rank={card.rank} suit={card.suit} />
      ))}
    </div>
  );
};

export default CardPair;
