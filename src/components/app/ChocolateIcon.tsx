import Image from 'next/image';

export function ChocolateIcon(props: { className?: string }) {
  return (
    <Image
      src="https://img.icons8.com/color/48/chocolate-bar.png"
      alt="Chocolate Bar"
      width={48}
      height={48}
      className={props.className}
    />
  );
}
