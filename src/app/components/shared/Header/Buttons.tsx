import { DiagonalFill } from "@/lib/ui/DiagonalFill";

export function Buttons() {
  return (
    <div className="flex h-full flex-col w-full">
      <div className="flex flex-1">
        <DiagonalFill href="/contacts" className="h-full w-full">
          Оставить заявку
        </DiagonalFill>
      </div>
    </div>
  );
}
