import { ProjectForm } from "@/app/components/forms/ProjectForm";
import { Separator } from "@/lib/ui/separator";
import { contactInfo } from "@/lib/site";

export default function ContactsPage() {
  return (
    <section className="mb-60 sm:mb-80 lg:mb-100">
      <div className="container">
        <div className="border border-carbon px-16 py-32 dark:border-paper sm:px-24 sm:py-40 lg:px-50 lg:py-80">
          <div className="mb-30 grid gap-24 sm:mb-40 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,32rem)] lg:items-start">
            <div>
              <h1 className="mb-16 font-unbounded text-24 leading-30 font-medium uppercase sm:mb-20 sm:text-32 sm:leading-40 lg:text-46 lg:leading-56">
                Заполните анкету, чтобы обсудить проект
              </h1>
              <p className="max-w-2xl text-14 leading-20 font-light sm:text-16 sm:leading-24">
                Мы принимаем на себя обязательство о том, что коммерческая
                информация, полученная в рамках подготовки и реализации проекта,
                является конфиденциальной и не подлежит разглашению или передаче
                третьим лицам.
              </p>
            </div>
            <div className="grid gap-8 text-14 uppercase sm:text-16 lg:justify-self-end">
              <span className="font-unbounded">Связаться напрямую</span>
              <a
                className="underline-offset-4 hover:underline"
                href={contactInfo.phoneHref}
              >
                {contactInfo.phone}
              </a>
              <a
                className="underline-offset-4 hover:underline"
                href={contactInfo.emailHref}
              >
                {contactInfo.email}
              </a>
            </div>
          </div>
          <Separator className="mb-30 w-full bg-carbon dark:bg-paper sm:mb-40" />
          <ProjectForm />
        </div>
      </div>
    </section>
  );
}
