type Message = string | null;

type Func<T = void> = () => T;

type PropsFunc<P = any, T = void> = (props: P) => T;
