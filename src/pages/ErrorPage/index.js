import errorImg from "../../assets/images/errorpage.jpg";
import logo from "../../assets/images/ei_nutri_logo.jpg";

export function ErrorPage() {
  return (
    <>
      <div className="flex justify-center pt-12 pb-6">
        <img
          src={logo}
          alt="ei nutri logo"
          className="sm:h-24 md:h-40 lg:h-56 rounded-full"
        />
      </div>
      <img className="h-full w-full" src={errorImg} alt="Error" />;
    </>
  );
}
