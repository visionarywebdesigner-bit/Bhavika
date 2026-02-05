import Image from 'next/image';

export function SmallHeartsIcon(props: { className?: string }) {
  return (
    <Image
      src="https://img.icons8.com/officel/50/small-hearts.png"
      alt="small-hearts"
      width={50}
      height={50}
      className={props.className}
    />
  );
}
