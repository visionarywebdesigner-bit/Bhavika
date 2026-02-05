import Image from 'next/image';

export function WomensBowIcon(props: { className?: string }) {
  return (
    <Image
      src="https://img.icons8.com/dusk/64/womens-bow.png"
      alt="womens-bow"
      width={64}
      height={64}
      className={props.className}
    />
  );
}
