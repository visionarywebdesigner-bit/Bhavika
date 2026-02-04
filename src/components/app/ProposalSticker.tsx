export function ProposalSticker(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <radialGradient id="blush">
          <stop offset="10%" stopColor="#F4AAB4" />
          <stop offset="100%" stopColor="#F4AAB4" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* ears */}
      <path d="M 20,28 C 10,10 40,15 40,28" fill="white"/>
      <path d="M 80,28 C 90,10 60,15 60,28" fill="white"/>
      {/* flower */}
      <circle cx="35" cy="20" r="3" fill="#FFC0CB"/>
      <circle cx="35" cy="20" r="1" fill="white"/>
      {/* head */}
      <ellipse cx="50" cy="50" rx="40" ry="30" fill="white" />
      {/* eyes */}
      <circle cx="40" cy="50" r="2.5" fill="black" />
      <circle cx="60"cy="50" r="2.5" fill="black" />
      {/* blush */}
      <circle cx="30" cy="58" r="7" fill="url(#blush)" />
      <circle cx="70" cy="58" r="7" fill="url(#blush)" />
      {/* mouth */}
      <path d="M 48 60 C 50 62, 50 62, 52 60" stroke="black" fill="none" strokeWidth="1"/>
      {/* hands */}
      <path d="M 40 70 C 30 75, 45 85, 50 75" fill="white"/>
      <path d="M 60 70 C 70 75, 55 85, 50 75" fill="white"/>
    </svg>
  );
}
