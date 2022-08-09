import { useAppContext } from "../AppContext";

export default function Home() {
  const { i18n } = useAppContext();

  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <h1 className="text-4xl font-bold">{i18n?.h1}</h1>
    </div>
  );
}
