import { useState, useEffect, useCallback } from 'react';
import Card from './components/Card';
import { drawTwoCards, getRandomPosition } from './utils/cards';
import './App.css';

function App() {
  const [cards, setCards] = useState(() => drawTwoCards());
  const [position, setPosition] = useState(() => getRandomPosition());
  const [showPosition, setShowPosition] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleNextHand = useCallback(() => {
    setIsFlipping(true);

    // アニメーションの中間点で新しいカードをセット
    setTimeout(() => {
      setCards(drawTwoCards());
      setPosition(getRandomPosition());
    }, 200);

    // アニメーション終了後にフラグをリセット
    setTimeout(() => {
      setIsFlipping(false);
    }, 400);
  }, []);

  const togglePosition = useCallback(() => {
    setShowPosition((prev) => !prev);
  }, []);

  // キーボードショートカット
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        handleNextHand();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextHand]);

  return (
    <div className="app">
      <div className="position-display">
        {showPosition ? (
          <>
            <span className="position-label">Position:</span>
            <span className="position-value">{position}</span>
          </>
        ) : (
          <span className="position-placeholder">ポジション非表示</span>
        )}
      </div>

      <div className="cards-container">
        {cards.map((card, index) => (
          <Card
            key={`${card.rank}-${card.suit}-${index}`}
            rank={card.rank}
            suit={card.suit}
            isFlipping={isFlipping}
          />
        ))}
      </div>

      <button className="next-button" onClick={handleNextHand}>
        次のハンド
      </button>

      <div className="toggle-container">
        <div
          className={`toggle-switch ${showPosition ? 'active' : ''}`}
          onClick={togglePosition}
          role="switch"
          aria-checked={showPosition}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.code === 'Enter' || e.code === 'Space') {
              e.preventDefault();
              togglePosition();
            }
          }}
        />
        <span className="toggle-label">ポジション表示</span>
      </div>

      <div className="shortcut-hint">Space: 次のハンド</div>
    </div>
  );
}

export default App;
