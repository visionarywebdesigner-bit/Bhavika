import Image from 'next/image';

export function HugIcon(props: { className?: string }) {
  return (
    <Image
      src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-hug-comfort-flaticons-flat-flat-icons-2.png"
      alt="Hug"
      width={64}
      height={64}
      className={props.className}
    />
  );
}
