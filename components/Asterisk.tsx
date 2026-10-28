// The asterisk mark in the top bar, drawn as four rounded bars.
export default function Asterisk({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {[0, 45, 90, 135].map((angle) => (
        <rect key={angle} x="9.25" y="1" width="5.5" height="22" rx="2.75" transform={`rotate(${angle} 12 12)`} fill="currentColor" />
      ))}
    </svg>
  );
}
