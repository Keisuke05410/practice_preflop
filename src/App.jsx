import { useState, useEffect, useCallback } from 'react';
import Card from './components/Card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { drawTwoCards, getRandomPosition } from './utils/cards';

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
    }, 300);

    // アニメーション終了後にフラグをリセット
    setTimeout(() => {
      setIsFlipping(false);
    }, 600);
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
    <div className="min-h-screen flex flex-col items-center justify-center p-5 gap-6 max-sm:p-4 max-sm:gap-5">
      <div className="min-h-[60px] flex items-center justify-center gap-2">
        {showPosition && (
          <>
            <span className="text-sm text-muted-foreground">Position:</span>
            <span className="text-[32px] max-sm:text-2xl font-bold tracking-wide">{position}</span>
          </>
        )}
      </div>

      <div className="flex gap-6 max-sm:gap-3.5">
        {cards.map((card, index) => (
          <Card
            key={index}
            rank={card.rank}
            suit={card.suit}
            isFlipping={isFlipping}
          />
        ))}
      </div>

      <Button size="lg" onClick={handleNextHand}>
        次のハンド
      </Button>

      <div className="flex items-center gap-3">
        <Switch
          id="position-toggle"
          checked={showPosition}
          onCheckedChange={setShowPosition}
        />
        <label htmlFor="position-toggle" className="text-sm select-none">
          ポジション表示
        </label>
      </div>

      <div className="fixed bottom-6 right-6 text-muted-foreground text-xs max-sm:hidden">Space: 次のハンド</div>
    </div>
  );
}

export default App;
