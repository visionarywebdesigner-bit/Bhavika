import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export interface DayContent {
  day: number;
  title: string;
  image: ImagePlaceholder;
  letter: string;
}

const getImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
        // Fallback for safety, though it should always be found.
        return {
            id: 'fallback',
            description: 'A placeholder image',
            imageUrl: 'https://picsum.photos/seed/fallback/600/800',
            imageHint: 'placeholder'
        };
    }
    return img;
};

export const valentinesData: DayContent[] = [
  {
    day: 7,
    title: "Rose Day",
    image: getImage('rose-bouquet'),
    letter: `This red rose carries everything my heart feels when it thinks of you. It holds the warmth of our conversations, the comfort of your presence, and the quiet certainty that loving you is the best decision I've ever made. Even when the distance feels heavy, my love for you never does. It grows deeper, steadier, and more certain with every passing day. You are the person my heart runs to, even when my body can't. This rose is my way of saying: I love you not just in words, but in patience, trust, and commitment. Today, tomorrow, and always my heart is yours.`
  },
  {
    day: 8,
    title: "Propose Day",
    image: getImage('proposal-ring'),
    letter: `On this day of proposals, I don't have a diamond ring, but I offer you something far more precious: my whole heart. I propose we continue this beautiful journey together, building a future filled with laughter, support, and endless love. I propose we keep choosing each other, every single day. Being with you feels like coming home, and I want to spend all my tomorrows with you. What do you say?`
  },
  {
    day: 9,
    title: "Chocolate Day",
    image: getImage('chocolates'),
    letter: `Like a box of assorted chocolates, our life together is full of sweet surprises, rich moments, and comforting delights. Each memory we create is a different flavor, and I cherish them all. You make my life sweeter just by being in it. I hope this note brings you a taste of the joy and sweetness you bring to me every day. You're more delicious than any chocolate.`
  },
  {
    day: 10,
    title: "Teddy Day",
    image: getImage('teddy-bear'),
    letter: `I'm sending this note with the warmth of a thousand teddy bear hugs. Whenever you feel down or just need a little comfort, I hope you think of me and feel my arms around you. Like a favorite teddy, I want to be your source of comfort, your safe place, and your constant companion. Thank you for being my teddy bear, always there to make things better.`
  },
  {
    day: 11,
    title: "Promise Day",
    image: getImage('promise-hands'),
    letter: `Today, I want to make you a few promises. I promise to always listen, even when I don't understand. I promise to support your dreams, no matter how big or small. I promise to be your biggest fan and your shoulder to cry on. But most of all, I promise to love you unconditionally, to cherish you, and to always, always be on your side. My heart is promised to you.`
  },
  {
    day: 12,
    title: "Hug Day",
    image: getImage('couple-hugging'),
    letter: `There's a special magic in your hugs. They can mend a bad day, calm a racing heart, and say "I love you" without a single word. I'm sending you a virtual hug right now, one that's big enough to last until I can hold you in my arms again. I can't wait to feel your hug, the safest and most wonderful place in the world.`
  },
  {
    day: 13,
    title: "Kiss Day",
    image: getImage('couple-kissing'),
    letter: `Every kiss we share tells a story. From our first nervous kiss to the comfortable, everyday ones, each is a reminder of the love that connects us. A kiss from you is a jolt of happiness, a moment of pure bliss. I'm counting down the moments until our next one. Get ready, because I have a lot of them saved up for you!`
  },
  {
    day: 14,
    title: "Valentine's Day",
    image: getImage('valentine-heart'),
    letter: `Happy Valentine's Day, my love. Today is a celebration of us, of the beautiful thing we have. You are my valentine today, tomorrow, and every day after. Loving you is the easiest and most natural thing I've ever done. Thank you for filling my life with so much love, joy, and meaning. My heart is yours completely. I love you more than you'll ever know.`
  },
];
