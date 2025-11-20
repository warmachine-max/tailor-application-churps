import a from "../../tailorHomePageImage/a.png";

export default function UpperHomePage() {
  return (
    <div className="w-full flex items-center justify-between max-w-7xl mx-auto px-10 pt-32 pb-20">

      {/* LEFT IMAGE */}
      <div className="w-1/2 flex justify-start">
        <img
          src={a}
          className="w-[90%] rounded-2xl shadow-lg"
        />
      </div>

      {/* RIGHT TEXT */}
      <div className="w-1/2 flex flex-col gap-6">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          Tailored Elegance,
          <br />Made Just for You
        </h1>

        <p className="text-gray-600 text-lg">
          Premium handcrafted outfits with perfect fitting — delivered with excellence.
        </p>
      </div>

    </div>
  );
}
