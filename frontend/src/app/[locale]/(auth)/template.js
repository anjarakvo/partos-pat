import Image from "next/image";
import classNames from "classnames";
import { sourceSans } from "@/app/fonts";

const AuthTemplate = ({ children }) => {
  return (
    <div
      className={classNames(
        sourceSans.className,
        "w-full max-w-9xl h-screen mx-auto flex flex-col md:flex-row gap-0 overflow-y-hidden"
      )}
    >
      <div className="hidden lg:block w-full lg:w-1/2 xl:w-3/4">
        <Image
          width={800}
          height={600}
          alt="PARTOS-PAT Background"
          src="https://placehold.co/1400x1100"
          className="bg-light-3 object-cover object-left w-full h-screen"
        />
      </div>
      <div className="w-full lg:w-1/2 xl:w-1/4 bg-light-1 px-6 py-3 text-dark-10 overflow-y-auto">{children}</div>
    </div>
  );
};

export default AuthTemplate;
