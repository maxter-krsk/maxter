import Plug from "@/app/components/ui/Plug";
import { ProjectForm } from "@/app/components/forms/ProjectForm";


export default function ContactsPage() {
  return (
    <Plug>
      <section>
        <div className="container">
          <ProjectForm />
        </div>
      </section>
    </Plug>
  );
}
