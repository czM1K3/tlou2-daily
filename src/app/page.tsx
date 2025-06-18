import { Tlou } from "./_components/tlou";

export const revalidate = 0;
export const runtime = "edge";

export default function Home() {
  return (
    <main>
      <Tlou />
    </main>
  );
}
