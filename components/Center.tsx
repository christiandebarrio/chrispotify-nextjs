import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";

const COLORS = [
  "from-blue-500",
  "from-green-500",
  "from-pink-500",
  "from-yellow-500",
  "from-purple-500",
  "from-orange-500",
  "from-red-500",
] as const;

export const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState<typeof COLORS[number] | undefined>(
    undefined
  );

  useEffect(() => {
    setColor(shuffle(COLORS).pop());
  }, []);

  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-5">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user?.image}
            alt=""
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        Hello
      </section>
    </div>
  );
};