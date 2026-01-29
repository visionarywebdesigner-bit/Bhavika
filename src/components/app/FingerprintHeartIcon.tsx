export function FingerprintHeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fill="currentColor"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
        <g fill="none" stroke="hsl(var(--background))" strokeWidth="0.8" strokeLinecap="round">
            <path d="M12 11.5 a 1 1 0 0 1 0 2" />
            <path d="M12 10.5 a 2 2 0 0 1 0 4" />
            <path d="M12 9.5 a 3 3 0 0 1 0 6" />
            <path d="M12 8.5 a 4 4 0 0 1 0 8" />
            <path d="M12 7.5 a 5 5 0 0 1 0 10" />
            <path d="M12 6.5 a 6 6 0 0 1 0 12" />
        </g>
    </svg>
  );
}
