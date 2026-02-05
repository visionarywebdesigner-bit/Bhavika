import Image from 'next/image';

export function RingIcon(props: { className?: string }) {
  return (
    <Image
      src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-propose-wedding-and-love-smashingstocks-flat-smashing-stocks.png"
      alt="Propose"
      width={66}
      height={66}
      className={props.className}
    />
  );
}
