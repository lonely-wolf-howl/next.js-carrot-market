export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5">
      <div className="flew fles-col items-center justify-center space-y-5">
        <div
          className="bg-white w-full shadow-lg p-5 rounded-3xl 
        max-w-screen-sm flex flex-col gap-4"
        >
          {['Person A', 'Person B', 'Person C', ''].map((person, index) => (
            <div
              key={index}
              className="flex items-center gap-5 border-b-2 pb-5 
            last:pb-0 last:border-0"
            >
              <div className="size-10 bg-blue-400 rounded-full" />
              <span
                className="text-lg font-medium 
                empty:w-20 empty:h-2 empty:rounded-full empty:animate-pulse empty:bg-gray-300"
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
        <div
          className="bg-white w-full shadow-lg p-5 rounded-3xl 
        max-w-screen-sm flex flex-col gap-4"
        >
          {['Person A', 'Person B', 'Person C'].map((person, index) => (
            <div
              key={index}
              className="flex items-center gap-5 border-b-2 pb-5 
            last:pb-0 last:border-0 animate-pulse"
            >
              <div className="size-10 bg-blue-400 rounded-full" />
              <div className="w-40 h-2 rounded-full bg-gray-400" />
              <div className="w-20 h-2 rounded-full bg-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
