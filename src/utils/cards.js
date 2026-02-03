// カードのスーツ
export const SUITS = ['♠', '♥', '♦', '♣'];

// カードのランク
export const RANKS = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

// ポジション一覧
export const POSITIONS = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'];

// 52枚のデッキを生成
export const createDeck = () => {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit });
    }
  }
  return deck;
};

// デッキをシャッフル
const shuffleDeck = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ランダムに2枚のカードを取得
export const drawTwoCards = () => {
  const deck = createDeck();
  const shuffled = shuffleDeck(deck);
  return [shuffled[0], shuffled[1]];
};

// ランダムなポジションを取得
export const getRandomPosition = () => {
  const index = Math.floor(Math.random() * POSITIONS.length);
  return POSITIONS[index];
};

// スーツが赤かどうか判定
export const isRedSuit = (suit) => {
  return suit === '♥' || suit === '♦';
};

// スーツ記号からフォルダ名へのマッピング
const SUIT_TO_FOLDER = {
  '♠': 'spade',
  '♥': 'heart',
  '♦': 'diamond',
  '♣': 'club',
};

// カード画像のパスを取得
export const getCardImagePath = (rank, suit) => {
  const folder = SUIT_TO_FOLDER[suit];
  return `/playing_cards/${folder}/${folder}_${rank}.png`;
};

// 全カード画像をプリロード
export const preloadAllCardImages = () => {
  const promises = [];

  for (const suit of SUITS) {
    for (const rank of RANKS) {
      const path = getCardImagePath(rank, suit);
      const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = path;
      });
      promises.push(promise);
    }
  }

  return Promise.all(promises);
};
