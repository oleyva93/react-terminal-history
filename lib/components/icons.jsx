import { isMac } from "../utils";

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

export function MacCommandIcon({ color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill={color}
        d="M100 86.38V100H86.38A14.25 14.25 0 0 1 72 87a14 14 0 0 1 15-15a14.25 14.25 0 0 1 13 14.38ZM72 169a14 14 0 0 0 15 15a14.25 14.25 0 0 0 13-14.34V156H86.38A14.25 14.25 0 0 0 72 169Zm112-82a14 14 0 0 0-15-15a14.25 14.25 0 0 0-13 14.34V100h13.62A14.25 14.25 0 0 0 184 87Zm40-23v128a32 32 0 0 1-32 32H64a32 32 0 0 1-32-32V64a32 32 0 0 1 32-32h128a32 32 0 0 1 32 32Zm-68 76v-24h13.38c16.39 0 30.21-12.88 30.61-29.25A30 30 0 0 0 169.25 56C152.88 56.41 140 70.23 140 86.62V100h-24V86.62c0-16.39-12.88-30.21-29.25-30.62A30 30 0 0 0 56 86.75C56.41 103.12 70.23 116 86.62 116H100v24H86.62c-16.39 0-30.21 12.88-30.62 29.25A30 30 0 0 0 86.75 200c16.37-.4 29.25-14.22 29.25-30.61V156h24v13.38c0 16.39 12.88 30.21 29.25 30.61A30 30 0 0 0 200 169.25c-.4-16.37-14.22-29.25-30.61-29.25Zm-40 0h24v-24h-24Zm40 30a14 14 0 1 0 14-14h-14Z"
      ></path>
    </svg>
  );
}

export function WinControlIcon({ color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={color}
        d="M2 7.25A3.25 3.25 0 0 1 5.25 4h13.5A3.25 3.25 0 0 1 22 7.25v9.5A3.25 3.25 0 0 1 18.75 20H5.25A3.25 3.25 0 0 1 2 16.75v-9.5ZM7.75 8A2.75 2.75 0 0 0 5 10.75v2.5A2.75 2.75 0 0 0 7.75 16h.5a.75.75 0 0 0 0-1.5h-.5c-.69 0-1.25-.56-1.25-1.25v-2.5c0-.69.56-1.25 1.25-1.25h.5a.75.75 0 0 0 0-1.5h-.5Zm3.75.75a.75.75 0 0 0-1.5 0V11h-.25a.75.75 0 0 0 0 1.5H10V14a2 2 0 0 0 2 2h.25a.75.75 0 0 0 0-1.5H12a.5.5 0 0 1-.5-.5v-1.5h.75a.75.75 0 0 0 0-1.5h-.75V8.75Zm8 0a.75.75 0 0 0-1.5 0v6.5a.75.75 0 0 0 1.5 0v-6.5Zm-4 4.25a.5.5 0 0 1 .5-.5h.25a.75.75 0 0 0 0-1.5H16a2 2 0 0 0-2 2v2.25a.75.75 0 0 0 1.5 0V13Z"
      ></path>
    </svg>
  );
}

export const ControlIcon = isMac ? MacCommandIcon : WinControlIcon;

export function LoadingIcon({ colorStatic, colorLoading, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3em"
      height="3em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={colorStatic || "#4b5563"}
        d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
        opacity=".5"
      ></path>
      <path
        fill={colorLoading || "#c7c7c7"}
        d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
      >
        <animateTransform
          attributeName="transform"
          dur="1s"
          from="0 12 12"
          repeatCount="indefinite"
          to="360 12 12"
          type="rotate"
        ></animateTransform>
      </path>
    </svg>
  );
}
