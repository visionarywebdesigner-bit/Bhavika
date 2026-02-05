
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
    letter: `“A rose by any other name would smell as sweet.”
In the same way, my love for you remains same no matter the form, no matter the distance.
Bhavika This year I am not able to actually give you roses, but maybe next year, hopefully I’ll be with you, right next to you, even if only for part of the day. How that will happen, idk I haven’t figured out yet. What I have figured out is this: choosing to love you has been the best decision I’ve ever made.

Happy Rose Day to my rose 🌹🌹`,
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
    letter: `“You are my today and all of my tomorrows.”
Someone once said that and honestly, I want you to be my today and all my tomorrows, Bhavu. It still feels like living a dream that how close we’ve grown in such a short time. Sometimes I find myself dreaming about the days which are yet to come- meeting your parents, building a life together, and yes… even day of marriage(sorry, kya karu, pyaar toh pyaar hota hai). I truly believe I’ve found the one my soul loves—the one who completes me. 
I want to spend all my tomorrows with you, Bhavika.
So… what do you say, baby? 💛`,
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
    letter: `"Life is like a box of chocolates… you never know what you’re gonna get.” But I know I will only get the best days of happiness till the time I have you in my life. You make my life sweeter just by being in it. Even ordinary days feel special with you Bhavika. It is comforting and genuinely happy.
I may not be there to give you chocolate today, but know this: you’re already the sweetest part of my life.
Happy Chocolate Day, my favorite sweetness 🤎🍫`,
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
    letter: `“Teddy bears don’t need hearts as they are already stuffed with love.” 
I send you this note with thousands of teddy bears stuffed with my love. Whenever you feel down or just need a little comfort, I hope you think of me and feel my arms around you. It is said Teddy bears are a symbol of comfort, companion, a safe place just like that Like a favorite teddy, I want to be your source of comfort, your safe place, and your constant companion. 
Thank you for always making things better in my life Bhavika. 
Mwaahhh 😽`,
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
    letter: `On this day of proposals, I don't have a diamond ring, but I offer you something far more precious: my whole heart. I propose we continue this beautiful journey together, building a future filled with laughter, support, and endless love. I propose we keep choosing each other, every single day. Being with you feels like coming home, and I want to spend all my tomorrows with you. What do you say?`,
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
