import { ProjectForm } from "@/app/components/forms/ProjectForm";
import { Separator } from "@/lib/ui/separator";
import { contactInfo } from "@/lib/site";

export default function ContactsPage() {
  return (
    <section className="mb-100">
      <div className="container">
        <div className="border border-carbon px-16 py-40 dark:border-paper sm:px-24 lg:px-50 lg:py-80">
          <div className="mb-40 grid gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,32rem)] lg:items-start">
            <div>
              <h1 className="mb-20 font-unbounded text-32 font-medium uppercase sm:text-46">
                Заполните анкету, чтобы обсудить проект
              </h1>
              <p className="max-w-2xl text-14 font-light sm:text-16">
                Мы принимаем на себя обязательство о том, что коммерческая
                информация, полученная в рамках подготовки и реализации проекта,
                является конфиденциальной и не подлежит разглашению или передаче
                третьим лицам.
              </p>
            </div>
            <div className="grid gap-8 text-14 uppercase sm:text-16">
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
          <Separator className="mb-40 w-full bg-carbon" />
          <ProjectForm />
        </div>
      </div>
    </section>
  );
}
