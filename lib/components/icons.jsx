export function UpIcon({ color, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill={color}
        d="M11 20V7.825l-5.6 5.6L4 12l8-8l8 8l-1.4 1.425l-5.6-5.6V20h-2Z"
      ></path>
    </svg>
  );
}

export function DownIcon({ color, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill={color}
        d="M12 19.575q-.2 0-.375-.062T11.3 19.3l-6.6-6.6q-.3-.3-.3-.712t.3-.713q.3-.3.7-.3t.7.3l4.9 4.9v-11.2q0-.425.288-.7T12 4q.425 0 .713.288T13 5v11.175l4.9-4.9q.3-.3.7-.3t.7.3q.3.3.3.713t-.3.712l-6.6 6.6q-.15.15-.325.213t-.375.062Z"
      ></path>
    </svg>
  );
}

export function OptionsIcon({ color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={color}
        d="M4 18q-.425 0-.713-.288T3 17q0-.425.288-.713T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18H4Zm0-5q-.425 0-.713-.288T3 12q0-.425.288-.713T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13H4Zm0-5q-.425 0-.713-.288T3 7q0-.425.288-.713T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8H4Z"
      ></path>
    </svg>
  );
}
