import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const BG_IMAGE = "https://cdn.poehali.dev/projects/613015e9-5a04-4be5-8e21-6245ef31f3c9/files/462d2188-7bf7-49b8-b83b-1b4a84861263.jpg";

const SECTIONS = ["Главная", "О продукте", "Характеристики", "Применение", "Контакты"];

const specs = [
  { icon: "Shield", label: "Защита и восстановление трущихся поверхностей", value: "Плакирующий слой" },
  { icon: "Clock", label: "Срок действия", value: "до 100 000 км" },
  { icon: "Droplets", label: "Расход", value: "от 5–50 мл на 1 л масла/топлива" },
  { icon: "Zap", label: "Совместимость", value: "Полная совместимость" },
  { icon: "Layers", label: "Эффект безызносности", value: "Устранение износа" },
];

const applications = [
  {
    icon: "Car",
    title: "Двигатели ДВС",
    desc: "Снижает износ цилиндров, поршней и коленвала. Восстанавливает компрессию и мощность.",
    badge: "Авто",
  },
  {
    icon: "Settings",
    title: "КПП и редукторы",
    desc: "Защищает шестерни и подшипники от задиров при экстремальных нагрузках.",
    badge: "Трансмиссия",
  },
  {
    icon: "Wrench",
    title: "Промышленность",
    desc: "Применяется в станках, компрессорах и гидравлике. Сокращает простои оборудования.",
    badge: "Производство",
  },
  {
    icon: "Anchor",
    title: "Морская техника",
    desc: "Стойкость к морской воде и агрессивным средам. Защита гребных валов и механизмов.",
    badge: "Флот",
  },
];

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToSection = (index: number) => {
    if (!containerRef.current) return;
    const target = index * window.innerWidth;
    containerRef.current.scrollTo({ left: target, behavior: "smooth" });
    setCurrentSection(index);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;

      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) < 10) return;

      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      if (delta > 0 && currentSection < SECTIONS.length - 1) {
        scrollToSection(currentSection + 1);
      } else if (delta < 0 && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }

      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 800);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [currentSection, isScrolling]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartX = e.touches[0].clientX; };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSection < SECTIONS.length - 1) scrollToSection(currentSection + 1);
        else if (diff < 0 && currentSection > 0) scrollToSection(currentSection - 1);
      }
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSection]);

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "var(--dark-bg)" }}>
      {/* Fixed Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5"
        style={{ background: "linear-gradient(180deg, rgba(10,15,30,0.97) 0%, transparent 100%)" }}
      >
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.poehali.dev/projects/613015e9-5a04-4be5-8e21-6245ef31f3c9/bucket/2ef6041d-b889-4046-8136-2168b85d4197.jpg"
            alt="AvtoVitamin"
            className="h-14 w-14 object-contain"
            style={{ mixBlendMode: "multiply", filter: "contrast(1.1)" }}
          />
          <span
            className="font-bold tracking-widest uppercase text-sm"
            style={{ fontFamily: "'Oswald', sans-serif", color: "var(--gold)" }}
          >
            AvtoVitamin
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {SECTIONS.map((s, i) => (
            <button
              key={i}
              className={`nav-link ${currentSection === i ? "active" : ""}`}
              onClick={() => scrollToSection(i)}
            >
              {s}
            </button>
          ))}
        </div>

        <button className="btn-gold text-xs" onClick={() => scrollToSection(4)}>
          Связаться
        </button>
      </nav>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="flex h-screen overflow-x-hidden overflow-y-hidden"
        style={{ scrollSnapType: "x mandatory", width: "100vw" }}
      >
        {/* ===== SECTION 1: HERO ===== */}
        <section
          className="h-scroll-section scanlines"
          style={{
            background: `linear-gradient(135deg, rgba(10,15,30,0.85) 0%, rgba(10,15,30,0.6) 50%, rgba(5,10,25,0.88) 100%), url(${BG_IMAGE}) center/cover no-repeat`,
            scrollSnapAlign: "start",
          }}
        >
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, var(--gold), transparent)" }} />
          <div className="absolute right-16 top-0 bottom-0 w-px opacity-20" style={{ background: "linear-gradient(180deg, transparent, var(--steel), transparent)" }} />

          <div className="relative z-10 flex flex-col justify-center h-full px-16 md:px-24 max-w-5xl">
            <div className="heading-line mb-4 animate-fade-in-left delay-100">
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "'Oswald', sans-serif" }}>
                Инновационная защита металла
              </span>
            </div>

            <h1
              className="text-6xl md:text-8xl font-bold uppercase leading-none mb-6 animate-fade-in-up delay-200"
              style={{ fontFamily: "'Oswald', sans-serif", lineHeight: 0.9 }}
            >
              <span className="block text-white">Безызносные</span>
              <span className="block gold-text">Решения</span>
              <span className="block text-white" style={{ fontSize: "0.55em", lineHeight: 1.3 }}>для «Двигателей<br/>Внутреннего Сгорания»</span>
            </h1>

            <p
              className="text-lg max-w-xl mb-10 animate-fade-in-up delay-300"
              style={{ color: "rgba(232,240,248,0.7)", lineHeight: 1.7, fontWeight: 300 }}
            >
              Сокращение потребления топлива от&nbsp;8 до&nbsp;20%
            </p>

            <div className="flex items-center gap-4 animate-fade-in-up delay-400">
              <button className="btn-gold" onClick={() => scrollToSection(2)}>
                Характеристики
              </button>
              <button className="btn-outline-gold" onClick={() => scrollToSection(1)}>
                О продукте
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 right-10 flex items-center gap-2 animate-fade-in-right delay-600">
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--steel)", fontFamily: "'Oswald', sans-serif" }}>
              Далее
            </span>
            <Icon name="ArrowRight" size={16} color="var(--gold)" />
          </div>
        </section>

        {/* ===== SECTION 2: О ПРОДУКТЕ ===== */}
        <section
          className="h-scroll-section"
          style={{
            background: `linear-gradient(135deg, rgba(10,15,30,0.95) 0%, rgba(15,25,50,0.92) 100%), url(${BG_IMAGE}) center/cover no-repeat`,
            scrollSnapAlign: "start",
          }}
        >
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(59,130,246,0.08) 0%, transparent 60%)" }} />

          <div className="relative z-10 flex flex-col justify-center h-full px-16 md:px-24">
            <div className="heading-line mb-3">
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "'Oswald', sans-serif" }}>
                О продукте
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold uppercase mb-8"
              style={{ fontFamily: "'Oswald', sans-serif", lineHeight: 1, color: "#fff" }}
            >
              Линейка <span className="gold-text">продуктов</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
              {[
                {
                  code: "СТ 104",
                  type: "Жидкость",
                  color: "зелёная",
                  icon: "FlaskConical",
                  title: "Плакирующая, смазывающая композиция",
                  apply: "Добавка в СМ МКПП, раздаток, редукторов",
                  desc: "Ионосодержащий продукт на аминокислотной основе. Образует разделительную плёнку в зоне контакта пар трения.",
                  perks: ["Не смывается водой", "Любые типы металлов и сплавов", "Срок эксплуатации СМ ×2", "Ресурс без проблем ×7–8", "Снижает нагрев на 15–20°С"],
                },
                {
                  code: "ПТ 105",
                  type: "Жидкость",
                  color: "зелёная",
                  icon: "Fuel",
                  title: "Моющая, смазывающая композиция",
                  apply: "Добавка в бензин или дизельное топливо",
                  desc: "Создаёт избирательный перенос — самопроизвольное образование тонкой неокисляющейся плёнки с низким сопротивлением сдвигу.",
                  perks: ["Повышенные моющие свойства", "Нет резус-конфликта с СМ", "Безопасна для человека"],
                },
                {
                  code: "СЕ 102",
                  type: "Жидкость",
                  color: "зелёная",
                  icon: "Droplets",
                  title: "Моющая, смазывающая композиция",
                  apply: "Добавка в смазочные материалы (СМ)",
                  desc: "Образует тонкую металлическую плёнку в зоне контакта, повышает износостойкость поверхности до двух порядков.",
                  perks: ["Не смывается водой", "Металл, тефлон, РТИ", "Срок эксплуатации СМ ×2", "Повышенные моющие свойства", "Безопасна для человека"],
                },
                {
                  code: "СТ Н4",
                  type: "Пластичная",
                  color: "мазь зелёная",
                  icon: "Shield",
                  title: "Пластичная плакировочная смазывающая композиция",
                  apply: "Для узлов трения всех типов",
                  desc: "Мазеподобный продукт. Образует тонкую металлическую плёнку, повышает износостойкость поверхности до двух порядков.",
                  perks: ["Не смывается водой", "Металл, тефлон, РТИ", "Нет резус-конфликта с СМ"],
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="spec-card p-5 flex flex-col"
                  style={{ borderColor: "rgba(59,130,246,0.25)" }}
                >
                  <div className="flex items-center gap-3 mb-3 pb-3" style={{ borderBottom: "1px solid rgba(59,130,246,0.15)" }}>
                    <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.3)" }}>
                      <Icon name={p.icon} size={18} color="var(--gold)" />
                    </div>
                    <div>
                      <div className="text-lg font-bold gold-text leading-none" style={{ fontFamily: "'Oswald', sans-serif" }}>{p.code}</div>
                      <div className="text-xs" style={{ color: "var(--steel)" }}>{p.type}</div>
                    </div>
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1 text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>{p.title}</div>
                  <div className="text-xs mb-3" style={{ color: "var(--gold)", opacity: 0.8 }}>{p.apply}</div>
                  <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: "rgba(232,240,248,0.6)" }}>{p.desc}</p>
                  <div className="space-y-1.5">
                    {p.perks.map((perk, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <Icon name="Check" size={10} color="var(--gold)" />
                        <span className="text-xs" style={{ color: "rgba(232,240,248,0.75)" }}>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: ХАРАКТЕРИСТИКИ ===== */}
        <section
          className="h-scroll-section"
          style={{ background: "var(--dark-bg)", scrollSnapAlign: "start" }}
        >
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(59,130,246,0.08) 0%, transparent 60%)" }} />

          <div className="relative z-10 flex flex-col justify-center h-full px-16 md:px-24">
            <div className="heading-line mb-4">
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "'Oswald', sans-serif" }}>
                Технические характеристики
              </span>
            </div>
            <h2
              className="text-5xl md:text-6xl font-bold uppercase mb-12"
              style={{ fontFamily: "'Oswald', sans-serif", lineHeight: 1, color: "#fff" }}
            >
              Параметры <span className="gold-text">эффективности</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl">
              {specs.map((spec, i) => (
                <div key={i} className="spec-card p-6">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center mb-4"
                    style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}
                  >
                    <Icon name={spec.icon} size={20} color="var(--gold)" />
                  </div>
                  <div className="text-xl font-bold mb-1 gold-text" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {spec.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: "var(--steel)" }}>
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-10 max-w-5xl p-5 flex items-center justify-between"
              style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)" }}
            >
              <div className="flex items-center gap-3">
                <Icon name="Award" size={20} color="var(--gold)" />
                <span className="text-sm" style={{ color: "rgba(232,240,248,0.8)" }}>
                  Соответствует требованиям ГОСТ Р 51634, ISO 6743-99
                </span>
              </div>
              <span className="text-xs" style={{ color: "var(--steel)", fontFamily: "'Oswald', sans-serif" }}>
                СЕРТИФИЦИРОВАНО
              </span>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: ПРИМЕНЕНИЕ ===== */}
        <section
          className="h-scroll-section"
          style={{
            background: `linear-gradient(135deg, rgba(8,13,28,0.92) 0%, rgba(10,20,45,0.88) 100%), url(${BG_IMAGE}) center/cover no-repeat`,
            scrollSnapAlign: "start",
          }}
        >
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(249,115,22,0.07) 0%, transparent 50%)" }} />

          <div className="relative z-10 flex flex-col justify-center h-full px-16 md:px-24">
            <div className="heading-line mb-4">
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "'Oswald', sans-serif" }}>
                Область применения
              </span>
            </div>
            <h2
              className="text-5xl md:text-6xl font-bold uppercase mb-12"
              style={{ fontFamily: "'Oswald', sans-serif", lineHeight: 1, color: "#fff" }}
            >
              Где работает <span className="gold-text">защита</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
              {applications.map((app, i) => (
                <div
                  key={i}
                  className="relative p-6"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(59,130,246,0.15)",
                  }}
                >
                  <span
                    className="absolute top-4 right-4 text-xs px-2 py-0.5 tracking-wider uppercase"
                    style={{
                      background: "rgba(249,115,22,0.1)",
                      border: "1px solid rgba(249,115,22,0.3)",
                      color: "var(--gold)",
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: "10px",
                    }}
                  >
                    {app.badge}
                  </span>

                  <div
                    className="w-12 h-12 flex items-center justify-center mb-5"
                    style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
                  >
                    <Icon name={app.icon} size={24} color="var(--gold)" />
                  </div>

                  <h3 className="text-lg font-bold uppercase mb-3" style={{ fontFamily: "'Oswald', sans-serif", color: "#fff" }}>
                    {app.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(232,240,248,0.6)", fontWeight: 300 }}>
                    {app.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 5: КОНТАКТЫ ===== */}
        <section
          className="h-scroll-section"
          style={{ background: "var(--dark-bg)", scrollSnapAlign: "start" }}
        >
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />

          <div className="relative z-10 flex items-center justify-center h-full px-8">
            <div className="w-full max-w-4xl">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                  <div className="heading-line">
                    <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "'Oswald', sans-serif" }}>
                      Контакты
                    </span>
                  </div>
                </div>
                <h2
                  className="text-5xl md:text-6xl font-bold uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif", lineHeight: 1, color: "#fff" }}
                >
                  Напишите <span className="gold-text">нам</span>
                </h2>
                <p className="mt-4 text-sm" style={{ color: "rgba(232,240,248,0.5)" }}>
                  Ответим в течение одного рабочего дня
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div
                  className="p-8 relative corner-tl corner-br"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(59,130,246,0.2)" }}
                >
                  <div className="space-y-4">
                    {[
                      { label: "Имя", placeholder: "Ваше имя", type: "text" },
                      { label: "Телефон", placeholder: "+7 (___) ___-__-__", type: "tel" },
                      { label: "Email", placeholder: "mail@company.ru", type: "email" },
                    ].map((field, i) => (
                      <div key={i}>
                        <label
                          className="block text-xs tracking-widest uppercase mb-2"
                          style={{ color: "var(--steel)", fontFamily: "'Oswald', sans-serif" }}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 text-sm outline-none transition-all"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(59,130,246,0.2)",
                            color: "#e8f0f8",
                            fontFamily: "'Roboto', sans-serif",
                          }}
                          onFocus={e => (e.target.style.borderColor = "rgba(249,115,22,0.6)")}
                          onBlur={e => (e.target.style.borderColor = "rgba(59,130,246,0.2)")}
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        className="block text-xs tracking-widest uppercase mb-2"
                        style={{ color: "var(--steel)", fontFamily: "'Oswald', sans-serif" }}
                      >
                        Сообщение
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Расскажите о вашей задаче..."
                        className="w-full px-4 py-3 text-sm outline-none resize-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(59,130,246,0.2)",
                          color: "#e8f0f8",
                          fontFamily: "'Roboto', sans-serif",
                        }}
                        onFocus={e => (e.target.style.borderColor = "rgba(249,115,22,0.6)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(59,130,246,0.2)")}
                      />
                    </div>

                    <button className="btn-gold w-full mt-2">
                      Отправить заявку
                    </button>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-6">
                  {[
                    { icon: "Phone", label: "Телефон", val: "+7 988 525 52 82" },
                    { icon: "Mail", label: "Email", val: "5sveteslav5@gmail.com" },
                    { icon: "MapPin", label: "Адрес", val: "Краснодарский край, Северский район, ул. Вокзальная, 58" },
                    { icon: "Clock3", label: "Режим работы", val: "Пн–Пт: 9:00 – 18:00" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
                      >
                        <Icon name={c.icon} size={18} color="var(--gold)" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--steel)", fontFamily: "'Oswald', sans-serif" }}>
                          {c.label}
                        </div>
                        <div className="text-sm" style={{ color: "#e8f0f8" }}>{c.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Navigation dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            className={`nav-dot ${currentSection === i ? "active" : ""}`}
            onClick={() => scrollToSection(i)}
            title={SECTIONS[i]}
          />
        ))}
      </div>

      {/* Section counter */}
      <div className="fixed bottom-6 left-10 z-50 flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
        <span className="text-2xl font-bold" style={{ color: "var(--gold)" }}>
          0{currentSection + 1}
        </span>
        <span style={{ color: "rgba(232,240,248,0.3)" }}>/</span>
        <span className="text-sm" style={{ color: "rgba(232,240,248,0.3)" }}>
          0{SECTIONS.length}
        </span>
        <span className="text-xs tracking-widest uppercase ml-2 hidden md:block" style={{ color: "rgba(232,240,248,0.4)" }}>
          {SECTIONS[currentSection]}
        </span>
      </div>
    </div>
  );
}