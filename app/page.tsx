export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5">
      <div
        className="bg-white w-full shadow-lg p-5 rounded-3xl 
        max-w-screen-sm flex flex-col gap-4"
      >
        {['Person A', 'Person B', 'Person C', ''].map((person, index) => (
          <div
            key={index}
            className="flex items-center group gap-5 border-b-2 pb-5 
            last:pb-0 last:border-0"
          >
            <div className="size-10 bg-blue-400 rounded-full" />
            <span
              className="text-lg font-medium 
                empty:w-20 empty:h-2 empty:rounded-full empty:animate-pulse empty:bg-gray-300 
                group-hover:text-gray-500"
            >
              {person}
            </span>
            <div
              className="size-6 bg-red-500 text-white 
              flex items-center justify-center rounded-full relative"
            >
              <span className="z-10">{index}</span>
              <div
                className="size-6 bg-red-500 rounded-full 
                  absolute animate-ping"
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
