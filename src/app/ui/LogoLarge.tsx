import Image from "next/image";

export default function LogoLarge() {
  return (
    <section className="flex flex-col items-center gap-4">
      <Image
        width={300}
        height={120}
        src="/icons/logos/maxter-logo-large.svg"
        alt="Полный логотип Maxter"
      />
      <img
        src="/icons/ui/star-custom.svg"
        alt="Декоративный элемент звёздочка"
      />
    </section>
  );
}
