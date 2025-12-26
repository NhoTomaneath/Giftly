export interface Sticker {
  id: string;
  name: string;
  emoji: string;
  background: string;
}

export const STICKERS: Sticker[] = [
  {
    id: 'fireworks',
    name: 'Fireworks',
    emoji: '🎆',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'champagne',
    name: 'Champagne',
    emoji: '🍾',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 'party',
    name: 'Party Popper',
    emoji: '🎉',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 'sparkler',
    name: 'Sparkler',
    emoji: '✨',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 'clock',
    name: 'Midnight Clock',
    emoji: '🕛',
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    id: 'balloon',
    name: 'Balloon',
    emoji: '🎈',
    background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  },
  {
    id: 'confetti',
    name: 'Confetti Ball',
    emoji: '🎊',
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
  {
    id: 'gift',
    name: 'Gift',
    emoji: '🎁',
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  },
  {
    id: 'star',
    name: 'Star',
    emoji: '⭐',
    background: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
  },
  {
    id: 'heart',
    name: 'Heart',
    emoji: '❤️',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)',
  },
  {
    id: 'dragon',
    name: 'Dragon',
    emoji: '🐉',
    background: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
  },
  {
    id: 'moon',
    name: 'New Moon',
    emoji: '🌙',
    background: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
  },
];
