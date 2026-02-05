import Image from 'next/image';

export function ValentinesDayIcon(props: { className?: string }) {
  return (
    <Image
      src="https://img.icons8.com/clouds/100/like--v1.png"
      alt="Valentine's Day"
      width={100}
      height={100}
      className={props.className}
    />
  );
}
