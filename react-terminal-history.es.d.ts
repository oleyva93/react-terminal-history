import { ReactNode } from 'react';

interface ReactTerminalHistoryProps {
  data: any[] | string[] | undefined;
  title?: string;
  renderLine?: any;
  showSkeleton?: boolean;
  loading?: boolean;
  notFoundContent?: string;
  classes?: {
    container?: string;
    header?: string;
    content?: string;
    input?: string;
    item?: string;
  };
  optionIcon?: ReactNode;
}

declare module 'react-terminal-history' {
  const ReactTerminalHistory: React.FC<ReactTerminalHistoryProps>;
  export default ReactTerminalHistory;
}
