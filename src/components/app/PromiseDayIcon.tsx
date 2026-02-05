import Image from 'next/image';

export function PromiseDayIcon(props: { className?: string }) {
  return (
    <Image
      src="https://img.icons8.com/external-obvious-flat-kerismaker/48/external-couple-wedding-day-flat-obvious-flat-kerismaker-5.png"
      alt="Promise"
      width={48}
      height={48}
      className={props.className}
    />
  );
}
