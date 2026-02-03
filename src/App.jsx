import { useState, useEffect, useCallback, useRef } from 'react';
import Card from './components/Card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { drawTwoCards, getRandomPosition } from './utils/cards';

function App() {
  const [cards, setCards] = useState(() => drawTwoCards());
  const [position, setPosition] = useState(() => getRandomPosition());
  const [showPosition, setShowPosition] = useState(true);
  // flipPhase: 'idle' | 'out' | 'in'
  const [flipPhase, setFlipPhase] = useState('idle');
  const animationEndCountRef = useRef(0);

  const handleNextHand = useCallback(() => {
    if (flipPhase !== 'idle') return; // アニメーション中は無視
    animationEndCountRef.current = 0;
    setFlipPhase('out');
  }, [flipPhase]);

  const handleAnimationEnd = useCallback(() => {
    animationEndCountRef.current += 1;
    // 2枚のカード両方のアニメーションが終わるまで待つ
    if (animationEndCountRef.current < 2) return;

    animationEndCountRef.current = 0;

    if (flipPhase === 'out') {
      // flipOut完了: カードを更新してflipInへ
      setCards(drawTwoCards());
      setPosition(getRandomPosition());
      setFlipPhase('in');
    } else if (flipPhase === 'in') {
      // flipIn完了: idleに戻る
      setFlipPhase('idle');
    }
  }, [flipPhase]);

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
            flipPhase={flipPhase}
            onAnimationEnd={handleAnimationEnd}
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
