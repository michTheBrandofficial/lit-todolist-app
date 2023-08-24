export {};

declare global {
  type ButtonArray = Array<{
    button: string;
    path: typeof arrowCircleDown;
  }>;

  type ToolsArray = Array<
    Omit<ButtonArray[number], 'button'> & {
      color: [string, string];
      name: ToolsUnion;
    }
  >;

  type ToolsUnion = 'check' | 'x' | 'tag' | 'search' | 'plus';

  type ToolsClickhandlersMap = {
    [key in ToolsUnion]?: (e: LitMouseEvent<HTMLButtonElement>) => void;
  };

  type Links = ['Todos', 'Notes'];

  type LinksUnion = Links[number];

  type Keyof<T> = keyof T;
  type Typeof<T> = typeof T;
}
