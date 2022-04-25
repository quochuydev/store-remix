import { Link } from "remix";

export default function ProductLeftBanner({ children }: any) {
  return (
    <div className="grid xs:grid-cols-1 md:grid-cols-6 gap-8 mx-auto px-8">
      <div className="space-y-8 col-span-1">
        <div
          className="banner banner3 banner-fixed overlay-dark h-100"
          style={{
            backgroundColor: "rgb(37, 36, 42)",
            position: "relative",
            display: "block",
          }}
        >
          <img src={"/banner.png"} alt="banner" height={350} />
          <div
            className="p-4"
            style={{
              position: "absolute",
              bottom: 0,
            }}
          >
            <h4 className="text-md text-white uppercase">New Collection</h4>
            <h3 className="text-lg text-white font-bold">
              Find out Jodan trending!
            </h3>
            <Link
              to="/shop"
              className="border border-white-600 py-2 px-4 text-white block"
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-8 xs:col-span-1 md:col-span-5">{children}</div>
    </div>
  );
}
