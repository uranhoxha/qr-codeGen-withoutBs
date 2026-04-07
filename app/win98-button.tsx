export function Win98Button({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="win98-btn px-4 py-1 text-[13px] cursor-pointer"
    >
      {children}
    </button>
  );
}
