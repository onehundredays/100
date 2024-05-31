import Link from "next/link";
import { info } from "~/scripts/days"

const Home = () => {

  return (
    <pre className="mt-12 flex-1 flex flex-col">
      <p className="mb-4">100 Days Challenges.</p>
      <code className="grid gap-x-4 gap-y-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-md">
        {info.map((day, index) => (
          <Link
            key={index}
            href={`/days/${day.day}`}
            className="block mr-4"
          >
            <span className="opacity-50">{day.day}</span>{' '}
            <span className="text-zinc-600/80 hover:text-zinc-600">{day.title}</span>
          </Link>
        ))}
      </code>
    </pre>
  );
}

export default Home;
