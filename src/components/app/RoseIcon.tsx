import Image from 'next/image';

export function RoseIcon(props: { className?: string }) {
  return (
    <Image
      src="https://img.icons8.com/color/48/rose-bouquet.png"
      alt="Rose Bouquet"
      width={48}
      height={48}
      className={props.className}
    />
  );
}
