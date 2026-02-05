import Image from 'next/image';

export function TeddyBearIcon(props: { className?: string }) {
  return (
    <Image
      src="https://img.icons8.com/color/48/teddy-bear.png"
      alt="Teddy Bear"
      width={48}
      height={48}
      className={props.className}
    />
  );
}
