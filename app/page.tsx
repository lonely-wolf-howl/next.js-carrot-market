export default function Home() {
  return (
    <main
      className="bg-gray-100 
    sm:bg-red-500 md:bg-green-500 lg:bg-blue-500 xl:bg-purple-500 
      h-screen flex items-center justify-center p-5"
    >
      <div
        className="bg-white w-full shadow-lg p-5 rounded-3xl 
        max-w-screen-sm flex flex-col md:flex-row gap-2"
      >
        <input
          type="text"
          placeholder="enter your email"
          className="w-full rounded-full h-12 bg-gray-200 pl-5
          outline-none ring ring-transparent focus:ring-green-300 focus:ring-offset-2 
          transition-shadow placeholder:drop-shadow
          invalid:focus:ring-red-300 peer"
          required
        />
        <span className="text-red-300 font-medium hidden peer-invalid:block">
          email is required.
        </span>
        <button
          className="bg-black peer-invalid:bg-red-300
          text-white py-2 rounded-full
          active:scale-90 outline-none transition-transform font-medium md:px-10"
        >
          LOGIN
        </button>
      </div>
    </main>
  );
}
