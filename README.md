# React Terminal History

> [!NOTE]
> Is compatible with ssr

[![NPM Version](https://img.shields.io/npm/v/react-terminal-history.svg)](https://www.npmjs.com/package/react-terminal-history)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/oleyva93/react-terminal-history/blob/master/LICENSE)

A Powerful Terminal Log Component for React Applications compatible with SSR

## Installation

```bash
npm install react-terminal-history
```

## Usage

```javascript
import ReactTerminalHistory from "react-terminal-history";

const fakeData = ["Line1", "Line2"];

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen p-20">
        <ReactTerminalHistory data={fakeData} title="Logs" />
      </div>
    </>
  );
}

export default App;
```

## Props

| Name            | Type    | Required | Default            | Description                           |
| --------------- | ------- | -------- | ------------------ | ------------------------------------- |
| data            | array   | false    | []                 | Array of strings to be displayed      |
| classes         | objects | false    | {}                 | Classes to be applied to the terminal |
| title           | string  | false    | ""                 | Title of the terminal                 |
| renderLine      | func    | false    | null               | Function to render each terminal line |
| showSkeleton    | bool    | false    | false              | Show skeleton while is scrolling      |
| loading         | bool    | false    | false              | Show loading element while load data  |
| notFoundContent | string  | false    | "No history found" | Not found content                     |
| optionIcon      | node    | false    | undefined          | Option icon                           |

## Classes Keys

| Name      | Type   | Required | Default | Description                                     |
| --------- | ------ | -------- | ------- | ----------------------------------------------- |
| container | string | false    | ''      | Classes to be applied to the terminal container |
| header    | string | false    | ''      | Classes to be applied to the terminal header    |
| content   | string | false    | ''      | Classes to be applied to the terminal content   |
| input     | string | false    | ''      | Classes to be applied to the terminal input     |

## Demo

[react-terminal-history-ac7k.vercel.app/](https://react-terminal-history-ac7k.vercel.app/)

## License

React Terminal History is [MIT licensed](./LICENSE).
