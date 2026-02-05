import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export interface DayContent {
  day: number;
  title: string;
  image: ImagePlaceholder;
  letter: string;
  gif: {
    postId: string;
    aspectRatio: string;
    url: string;
    title: string;
  };
}

const getImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
        // Fallback for safety, though it should always be found.
        return {
            id: 'fallback',
            description: 'A placeholder image',
            imageUrl: '/images/valentine-heart.jpg'
        };
    }
    return img;
};

export const valentinesData: DayContent[] = [
  {
    day: 7,
    title: "Rose Day",
    image: getImage('rose-bouquet'),
    letter: `This red rose carries everything my heart feels when it thinks of you. It holds the warmth of our conversations, the comfort of your presence, and the quiet certainty that loving you is the best decision I've ever made. Even when the distance feels heavy, my love for you never does. It grows deeper, steadier, and more certain with every passing day. You are the person my heart runs to, even when my body can't. This rose is my way of saying: I love you not just in words, but in patience, trust, and commitment. Today, tomorrow, and always my heart is yours.`,
    gif: {
      postId: "21256849",
      aspectRatio: "1.02894",
      url: "https://tenor.com/view/rose-rosa-sant-jordi-rose-day-love-gif-21256849",
      title: "Rose Rosa GIF"
    }
  },
  {
    day: 8,
    title: "Propose Day",
    image: getImage('proposal-ring'),
    letter: `On this day of proposals, I don't have a diamond ring, but I offer you something far more precious: my whole heart. I propose we continue this beautiful journey together, building a future filled with laughter, support, and endless love. I propose we keep choosing each other, every single day. Being with you feels like coming home, and I want to spend all my tomorrows with you. What do you say?`,
    gif: {
      postId: "26865197",
      aspectRatio: "1.37339",
      url: "https://tenor.com/view/peach-goma-peach-and-goma-peach-peach-cat-love-gif-26865197",
      title: "Peach Goma Peach And Goma Sticker"
    }
  },
  {
    day: 9,
    title: "Chocolate Day",
    image: getImage('chocolates'),
    letter: `Like a box of assorted chocolates, our life together is full of sweet surprises, rich moments, and comforting delights. Each memory we create is a different flavor, and I cherish them all. You make my life sweeter just by being in it. I hope this note brings you a taste of the joy and sweetness you bring to me every day. You're more delicious than any chocolate.`,
    gif: {
      postId: "10146924857693137830",
      aspectRatio: "1",
      url: "https://tenor.com/view/valentine-valentine-day-chocolates-%EC%B4%88%EC%BD%9C%EB%A0%9B%EB%B0%94-%EB%B0%9C%EB%A0%8C%ED%83%80%EC%9D%B8-%EB%8D%B0%EC%9D%B4-gif-10146924857693137830",
      title: "Valentine Valentine Day Sticker"
    }
  },
  {
    day: 10,
    title: "Teddy Day",
    image: getImage('teddy-bear'),
    letter: `I'm sending this note with the warmth of a thousand teddy bear hugs. Whenever you feel down or just need a little comfort, I hope you think of me and feel my arms around you. Like a favorite teddy, I want to be your source of comfort, your safe place, and your constant companion. Thank you for being my teddy bear, always there to make things better.`,
    gif: {
      postId: "12913541",
      aspectRatio: "1.10667",
      url: "https://tenor.com/view/bear-teddy-gif-12913541",
      title: "Bear Teddy Sticker"
    }
  },
  {
    day: 11,
    title: "Promise Day",
    image: getImage('promise-hands'),
    letter: `Today, I want to make you a few promises. I promise to always listen, even when I don't understand. I promise to support your dreams, no matter how big or small. I promise to be your biggest fan and your shoulder to cry on. But most of all, I promise to love you unconditionally, to cherish you, and to always, always be on your side. My heart is promised to you.`,
    gif: {
      postId: "8762800",
      aspectRatio: "1.32143",
      url: "https://tenor.com/view/promise-hello-kitty-gif-8762800",
      title: "Promise Hello Kitty GIF"
    }
  },
  {
    day: 12,
    title: "Hug Day",
    image: getImage('couple-hugging'),
    letter: `There's a special magic in your hugs. They can mend a bad day, calm a racing heart, and say "I love you" without a single word. I'm sending you a virtual hug right now, one that's big enough to last until I can hold you in my arms again. I can't wait to feel your hug, the safest and most wonderful place in the world.`,
    gif: {
      postId: "23912005",
      aspectRatio: "1.24031",
      url: "https://tenor.com/view/hug-hugs-hugs-and-love-hug-romantic-pic-gif-23912005",
      title: "Hug Hugs Sticker"
    }
  },
  {
    day: 13,
    title: "Kiss Day",
    image: getImage('couple-kissing'),
    letter: `Every kiss we share tells a story. From our first nervous kiss to the comfortable, everyday ones, each is a reminder of the love that connects us. A kiss from you is a jolt of happiness, a moment of pure bliss. I'm counting down the moments until our next one. Get ready, because I have a lot of them saved up for you!`,
    gif: {
      postId: "1133735389315497118",
      aspectRatio: "1.23333",
      url: "https://tenor.com/view/kiss-love-i-love-you-i-love-you-so-much-i-love-you-very-much-gif-1133735389315497118",
      title: "Kiss Love Sticker"
    }
  },
  {
    day: 14,
    title: "Valentine's Day",
    image: getImage('valentine-heart'),
    letter: `Happy Valentine's Day, my love. Today is a celebration of us, of the beautiful thing we have. You are my valentine today, tomorrow, and every day after. Loving you is the easiest and most natural thing I've ever done. Thank you for filling my life with so much love, joy, and meaning. My heart is yours completely. I love you more than you'll ever know.`,
    gif: {
      postId: "2855815952576629853",
      aspectRatio: "1",
      url: "https://tenor.com/view/amor-amour-be-my-valentine-happy-valentine-happy-valentines-gif-2855815952576629853",
      title: "Amor Amour Sticker"
    }
  },
];
