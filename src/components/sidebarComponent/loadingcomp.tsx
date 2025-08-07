import { ImSpinner9 } from "react-icons/im";

export default function LoaderComponent() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <ImSpinner9 className=" animate-spin text-3xl mb-4" />
      <h2 className="scroll-m-20 pb-2 text-2xl px-4 font-semibold tracking-tight first:mt-0 flex justify-center items-center">
        Loading...
      </h2>
    </div>
  );
}
