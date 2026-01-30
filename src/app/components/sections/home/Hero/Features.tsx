export function Features() {
  const featuresItems = [
    {
      title: "Долгосрочный эффект",
      description:
        "Создаём систему, которая работает даже без постоянных вложений",
    },
    {
      title: "Честный маркетинг",
      description: "Если реклама не сработает, мы скажем об этом прямо",
    },
    {
      title: "Оптимизируем расходы",
      description: "Убираем лишние траты и усиливаем рабочие каналы",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <ul className="flex flex-col gap-20 sm:gap-0 sm:flex-row justify-center mb-20 sm:mb-30 sm:divide-x sm:divide-carbon dark:divide-paper">
        {featuresItems.map((item, i) => (
          <li
            key={i}
            className="px-20 first:pl-0 last:pr-0 text-center sm:text-left"
          >
            <h3 className="font-unbounded mb-8 sm:mb-20 uppercase dark:text-paper">
              {item.title}
            </h3>
            <p className="text-14 font-light dark:text-paper">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
