import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <h1 className="text-[2.5rem] font-bold text-center mt-40 mb-5">
        Страница не найдена!
      </h1>
      <Link
        className="flex flex justify-center items-center m-auto text-center border w-[20%] text-[1.2rem]"
        href="/"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
