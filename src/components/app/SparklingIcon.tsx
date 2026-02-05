import Image from 'next/image';

export function SparklingIcon(props: { className?: string }) {
  return (
    <Image
      src="https://img.icons8.com/color/48/sparkling.png"
      alt="sparkling"
      width={48}
      height={48}
      className={props.className}
    />
  );
}
