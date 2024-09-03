import { useTranslations } from "next-intl";
import { PartosLogo } from "@/components/Icons";
import { Link } from "@/routing";
import { RegisterForm } from "@/components";

const RegisterPage = () => {
  const t = useTranslations("Register");

  return (
    <div className="w-full space-y-6">
      <div className="w-full flex items-center justify-center pt-4 text-dark-10">
        <Link href="/">
          <PartosLogo width={125} height={125} />
        </Link>
      </div>
      <div className="space-y-4">
        <RegisterForm />
        <div className="w-full flex gap-2 items-center justify-center text-dark-10">
          <span>{t("loginText")}</span>
          <Link href="/login">
            <span className="font-bold text-primary-dark">
              {t("loginTextLink")}
            </span>
          </Link>
        </div>
      </div>
      <div className="w-full py-3">
        <p className="text-base text-dark-10">
          {t.rich("contactText", {
            email: () => (
              <a
                href="mailto:niels@partos.nl"
                className="text-blue underline"
              >
                niels@partos.nl
              </a>
            ),
          })}
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
