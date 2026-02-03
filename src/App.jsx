import { useState, useEffect, useCallback } from 'react';
import { Settings } from 'lucide-react';
import CardPair from './components/CardPair';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { drawTwoCards, getRandomPosition, preloadAllCardImages } from './utils/cards';

const ANIMATION_TYPES = [
  { id: 'scale', label: 'スケール' },
  { id: 'slide', label: 'スライド' },
  { id: 'fade', label: 'フェード' },
  { id: 'flip', label: '回転' },
];

function App() {
  // 画像プリロード状態
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 2レイヤー状態管理
  const [layerA, setLayerA] = useState(() => drawTwoCards());
  const [layerB, setLayerB] = useState(() => drawTwoCards());
  const [activeLayer, setActiveLayer] = useState('A');

  const [position, setPosition] = useState(() => getRandomPosition());
  const [showPosition, setShowPosition] = useState(true);

  // アニメーションタイプ
  const [animationType, setAnimationType] = useState('scale');

  // ダークモード状態管理
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // アプリ起動時に全カード画像をプリロード
  useEffect(() => {
    preloadAllCardImages()
      .then(() => setImagesLoaded(true))
      .catch(console.error);
  }, []);

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

    // 1. 新しいカードデータをセット
    if (activeLayer === 'A') {
      setLayerB(nextCards);
    } else {
      setLayerA(nextCards);
    }

    // 2. 次フレームでアクティブレイヤー切り替え（DOM更新後）
    requestAnimationFrame(() => {
      setActiveLayer(activeLayer === 'A' ? 'B' : 'A');
    });

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

  // プリロード完了前はローディング表示
  if (!imagesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-muted-foreground">Loading...</span>
      </div>
    );
  }

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
        <CardPair cards={layerA} isVisible={activeLayer === 'A'} animationType={animationType} />
        {/* Layer B */}
        <CardPair cards={layerB} isVisible={activeLayer === 'B'} animationType={animationType} />
      </div>

      {/* ボタンエリア */}
      <div className="relative flex items-center justify-center">
        <Button size="lg" onClick={handleNextHand}>
          次のハンド
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" aria-label="設定" className="absolute left-full ml-3">
              <Settings className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">設定</h4>

              {/* アニメーション選択 */}
              <div>
                <label className="text-sm text-muted-foreground">アニメーション</label>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {ANIMATION_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setAnimationType(type.id)}
                      className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                        animationType === type.id
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-secondary text-secondary-foreground border-border hover:bg-accent'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ポジション表示トグル */}
              <div className="flex items-center justify-between">
                <label htmlFor="position-toggle" className="text-sm text-muted-foreground">
                  ポジション表示
                </label>
                <Switch
                  id="position-toggle"
                  checked={showPosition}
                  onCheckedChange={setShowPosition}
                />
              </div>

              {/* ダークモードトグル */}
              <div className="flex items-center justify-between">
                <label htmlFor="dark-mode-toggle" className="text-sm text-muted-foreground">
                  ダークモード
                </label>
                <Switch
                  id="dark-mode-toggle"
                  checked={isDarkMode}
                  onCheckedChange={handleDarkModeChange}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="fixed bottom-6 right-6 text-muted-foreground text-xs max-sm:hidden">Space: 次のハンド</div>
    </div>
  );
}

export default App;
