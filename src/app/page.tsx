import dynamic from "next/dynamic";
const CountdownTimer = dynamic(() => import("@/components/countdown-timer"), {
  ssr: true,
});

export default function Home() {
  return (
    <div>
      <CountdownTimer />
    </div>
  );
}
