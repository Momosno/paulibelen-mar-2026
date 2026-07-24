import AgeGate from "./components/AgeGate";

/**
 * One document for everybody. <AgeGate /> serves the SFW cover in the initial
 * HTML and mounts the explicit content only after the +18 confirmation.
 */
export default function Home() {
  return <AgeGate />;
}
