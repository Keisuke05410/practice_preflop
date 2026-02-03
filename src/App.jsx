import { useState, useEffect, useCallback } from 'react';
import CardPair from './components/CardPair';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { drawTwoCards, getRandomPosition } from './utils/cards';

function App() {
  // 2レイヤー状態管理
  const [layerA, setLayerA] = useState(() => drawTwoCards());
  const [layerB, setLayerB] = useState(null);
  const [activeLayer, setActiveLayer] = useState('A');

  const [position, setPosition] = useState(() => getRandomPosition());
  const [showPosition, setShowPosition] = useState(true);

  // ダークモード状態管理
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // ダークモードの適用
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const handleDarkModeChange = useCallback((checked) => {
    setIsDarkMode(checked);
  }, []);

  const handleNextHand = useCallback(() => {
    const nextCards = drawTwoCards();
    const nextPosition = getRandomPosition();

    if (activeLayer === 'A') {
      setLayerB(nextCards);
      setActiveLayer('B');
    } else {
      setLayerA(nextCards);
      setActiveLayer('A');
    }
    setPosition(nextPosition);
  }, [activeLayer]);

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

      <div className="cards-pair-container">
        {/* Layer A */}
        {layerA && (
          <CardPair cards={layerA} isVisible={activeLayer === 'A'} />
        )}
        {/* Layer B */}
        {layerB && (
          <CardPair cards={layerB} isVisible={activeLayer === 'B'} />
        )}
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

      <div className="flex items-center gap-3">
        <Switch
          id="dark-mode-toggle"
          checked={isDarkMode}
          onCheckedChange={handleDarkModeChange}
        />
        <label htmlFor="dark-mode-toggle" className="text-sm select-none">
          ダークモード
        </label>
      </div>

      <div className="fixed bottom-6 right-6 text-muted-foreground text-xs max-sm:hidden">Space: 次のハンド</div>
    </div>
  );
}

export default App;
