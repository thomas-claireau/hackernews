type Props = {
  className?: string;
  children: JSX.Element | JSX.Element[] | string;
};

export default function Container({ className, children }: Props) {
  return <div className={`${className ? className : ""} w-full max-w-7xl mx-auto px-4`}>{children}</div>;
}
