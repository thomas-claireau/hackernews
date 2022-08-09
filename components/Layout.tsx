import BackTop from "./BackTop";
import Header from "./Header";

type Props = {
  children: JSX.Element | JSX.Element[] | string;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <BackTop />
    </div>
  );
}
