import Plug from "@/app/components/ui/Plug";
import { ProjectForm } from "@/app/components/forms/ProjectForm";
import { Separator } from "@/lib/ui/separator";

export default function ContactsPage() {
  return (
    <Plug>
      <section className="mb-100">
        <div className="container">
          <div className="py-100 border-x px-50 border-b border-t lg:border-t-0 border-carbon dark:border-paper">
            <h1 className="font-medium text-46 uppercase font-unbounded mb-20 max-w-[90%]">
              Заполните анкету, чтобы обсудить проект
            </h1>
            <p className="font-light text-14 mb-40 max-w-[40%]">
              Мы принимаем на себя обязательство о том, что коммерческая
              информация, полученная в рамках подготовки и реализации проекта,
              является конфиденциальной и не подлежит разглашению или передаче
              третьим лицам.
            </p>
            <Separator className="w-full bg-carbon mb-40" />
            <ProjectForm />
          </div>
        </div>
      </section>
    </Plug>
  );
}
