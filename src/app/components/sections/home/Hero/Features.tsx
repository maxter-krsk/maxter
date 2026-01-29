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
      <ul className="flex justify-center mb-30 divide-x divide-carbon">
        {featuresItems.map((item, i) => (
          <li key={i} className="px-20 first:pl-0 last:pr-0">
            <h3 className="font-unbounded mb-20 uppercase">{item.title}</h3>
            <p className="text-14 font-light">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
