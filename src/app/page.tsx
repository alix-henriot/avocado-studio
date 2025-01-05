import FeatureCard from "@/components/FeatureCard";


export default function Home() {
  return (
    <div
    className="min-h-screen flex flex-col"
    >
      <header
      className="bg-gray-800 text-white p-4"
      >
        <h1>Avocado Studio Pro</h1>
      </header>

      <main
      className="flex-grow p-4"
      >
        <FeatureCard title='Chinese Photography in South France' subtitle='Creative Production in Montpellier'/>
      </main>

      <footer
      className="bg-gray-800 text-white p-4 text-center"
      >
        <p>© 2025 Avocado Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}
