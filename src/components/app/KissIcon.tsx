import Image from 'next/image';

export function KissIcon(props: { className?: string }) {
  return (
    <Image
      src="https://img.icons8.com/color/48/kiss--v1.png"
      alt="Kiss"
      width={48}
      height={48}
      className={props.className}
    />
  );
}
