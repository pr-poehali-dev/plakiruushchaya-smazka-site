import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const BG_IMAGE = "https://cdn.poehali.dev/projects/613015e9-5a04-4be5-8e21-6245ef31f3c9/files/462d2188-7bf7-49b8-b83b-1b4a84861263.jpg";

const SECTIONS = ["Главная", "О продукте", "Характеристики", "Применение", "Контакты"];

const specs = [
  { icon: "Thermometer", label: "Рабочая температура", value: "-60°С до +350°С" },
  { icon: "Gauge", label: "Снижение трения", value: "до 70%" },
  { icon: "Shield", label: "Защита металла", value: "Плакирующий слой" },
  { icon: "Clock", label: "Срок действия", value: "до 100 000 км" },
  { icon: "Droplets", label: "Расход на двигатель", value: "100–200 мл" },
  { icon: "Zap", label: "Совместимость", value: "Все типы масел" },
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
        style={{ background: "linear-gradient(180deg, rgba(15,15,15,0.95) 0%, transparent 100%)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          >
            <Icon name="Droplets" size={14} color="#0F0F0F" />
          </div>
          <span
            className="font-bold tracking-widest uppercase text-sm"
            style={{ fontFamily: "'Oswald', sans-serif", color: "var(--gold)" }}
          >
            ProtectLube
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
            background: `linear-gradient(135deg, rgba(15,15,15,0.85) 0%, rgba(15,15,15,0.6) 50%, rgba(10,10,10,0.85) 100%), url(${BG_IMAGE}) center/cover no-repeat`,
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
              <span className="block text-white">Плакирующая</span>
              <span className="block gold-text">Смазывающая</span>
              <span className="block text-white">Композиция</span>
            </h1>

            <p
              className="text-lg max-w-xl mb-10 animate-fade-in-up delay-300"
              style={{ color: "rgba(212, 201, 176, 0.7)", lineHeight: 1.7, fontWeight: 300 }}
            >
              Создаёт защитный металлокерамический слой на поверхностях трения.
              Снижает износ до&nbsp;70% и продлевает ресурс двигателя в&nbsp;2–3 раза.
            </p>

            <div className="flex items-center gap-4 animate-fade-in-up delay-400">
              <button className="btn-gold" onClick={() => scrollToSection(2)}>
                Характеристики
              </button>
              <button className="btn-outline-gold" onClick={() => scrollToSection(1)}>
                О продукте
              </button>
            </div>

            <div className="flex gap-12 mt-16 animate-fade-in-up delay-500">
              {[
                { val: "70%", label: "снижение трения" },
                { val: "3×", label: "ресурс мотора" },
                { val: "20+", label: "лет на рынке" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold gold-text" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {s.val}
                  </div>
                  <div className="text-xs tracking-wider uppercase mt-1" style={{ color: "var(--steel)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
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
            background: `linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(20,18,14,0.88) 100%), url(${BG_IMAGE}) center/cover no-repeat`,
            scrollSnapAlign: "start",
          }}
        >
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)" }} />

          <div className="relative z-10 flex items-center h-full px-16 md:px-24 gap-20">
            <div className="flex-1 max-w-xl">
              <div className="heading-line mb-4">
                <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "'Oswald', sans-serif" }}>
                  О продукте
                </span>
              </div>
              <h2
                className="text-5xl md:text-6xl font-bold uppercase mb-8"
                style={{ fontFamily: "'Oswald', sans-serif", lineHeight: 1, color: "#fff" }}
              >
                Технология <span className="gold-text">нового</span> поколения
              </h2>
              <p className="mb-6 text-base leading-relaxed" style={{ color: "rgba(212, 201, 176, 0.7)", fontWeight: 300 }}>
                Композиция содержит активные компоненты на основе металлоорганических соединений,
                которые при контакте с нагретыми поверхностями трения образуют прочный сервовитный
                (плакирующий) слой толщиной 1–5 микрон.
              </p>
              <p className="mb-10 text-base leading-relaxed" style={{ color: "rgba(212, 201, 176, 0.7)", fontWeight: 300 }}>
                Этот слой обладает уникальными антифрикционными свойствами, выдерживает экстремальные
                нагрузки и восстанавливает изношенные поверхности без разборки агрегата.
              </p>

              {[
                "Работает с любыми минеральными и синтетическими маслами",
                "Не требует замены масла — добавляется в существующее",
                "Эффект сохраняется после замены масла",
                "Сертифицировано по стандартам ГОСТ и ISO",
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-3 mb-3">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                    style={{ background: "rgba(201,168,76,0.15)", border: "1px solid var(--gold)" }}>
                    <Icon name="Check" size={10} color="var(--gold)" />
                  </div>
                  <span className="text-sm" style={{ color: "rgba(212, 201, 176, 0.8)" }}>{f}</span>
                </div>
              ))}
            </div>

            <div className="hidden lg:block flex-1 max-w-sm">
              <div
                className="relative p-8 corner-tl corner-br"
                style={{
                  background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                <div className="text-center mb-6 pb-6" style={{ borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
                  <div
                    className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))", border: "2px solid rgba(201,168,76,0.4)" }}
                  >
                    <Icon name="FlaskConical" size={36} color="var(--gold)" />
                  </div>
                  <div className="gold-text text-2xl font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    СОСТАВ
                  </div>
                </div>

                {[
                  { label: "Металлоорганика", pct: 85 },
                  { label: "Модификаторы трения", pct: 70 },
                  { label: "Антиоксиданты", pct: 55 },
                  { label: "Синергисты", pct: 40 },
                ].map((item, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between text-xs mb-1" style={{ color: "rgba(212,201,176,0.7)" }}>
                      <span>{item.label}</span>
                      <span style={{ color: "var(--gold)" }}>{item.pct}%</span>
                    </div>
                    <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.pct}%`, background: "linear-gradient(90deg, var(--gold), #E8C96A)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: ХАРАКТЕРИСТИКИ ===== */}
        <section
          className="h-scroll-section"
          style={{ background: "var(--dark-bg)", scrollSnapAlign: "start" }}
        >
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(201,168,76,0.05) 0%, transparent 60%)" }} />

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
                    style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}
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
              style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)" }}
            >
              <div className="flex items-center gap-3">
                <Icon name="Award" size={20} color="var(--gold)" />
                <span className="text-sm" style={{ color: "rgba(212,201,176,0.8)" }}>
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
            background: `linear-gradient(135deg, rgba(12,12,12,0.90) 0%, rgba(15,15,15,0.85) 100%), url(${BG_IMAGE}) center/cover no-repeat`,
            scrollSnapAlign: "start",
          }}
        >
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(201,168,76,0.07) 0%, transparent 50%)" }} />

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
                    border: "1px solid rgba(201,168,76,0.15)",
                  }}
                >
                  <span
                    className="absolute top-4 right-4 text-xs px-2 py-0.5 tracking-wider uppercase"
                    style={{
                      background: "rgba(201,168,76,0.1)",
                      border: "1px solid rgba(201,168,76,0.3)",
                      color: "var(--gold)",
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: "10px",
                    }}
                  >
                    {app.badge}
                  </span>

                  <div
                    className="w-12 h-12 flex items-center justify-center mb-5"
                    style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}
                  >
                    <Icon name={app.icon} size={24} color="var(--gold)" />
                  </div>

                  <h3 className="text-lg font-bold uppercase mb-3" style={{ fontFamily: "'Oswald', sans-serif", color: "#fff" }}>
                    {app.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(212,201,176,0.6)", fontWeight: 300 }}>
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
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />

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
                <p className="mt-4 text-sm" style={{ color: "rgba(212,201,176,0.5)" }}>
                  Ответим в течение одного рабочего дня
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div
                  className="p-8 relative corner-tl corner-br"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)" }}
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
                            border: "1px solid rgba(201,168,76,0.2)",
                            color: "#D4C9B0",
                            fontFamily: "'Roboto', sans-serif",
                          }}
                          onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.6)")}
                          onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.2)")}
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
                          border: "1px solid rgba(201,168,76,0.2)",
                          color: "#D4C9B0",
                          fontFamily: "'Roboto', sans-serif",
                        }}
                        onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.6)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.2)")}
                      />
                    </div>

                    <button className="btn-gold w-full mt-2">
                      Отправить заявку
                    </button>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-6">
                  {[
                    { icon: "Phone", label: "Телефон", val: "+7 (800) 000-00-00" },
                    { icon: "Mail", label: "Email", val: "info@protectlube.ru" },
                    { icon: "MapPin", label: "Адрес", val: "Москва, ул. Промышленная, 12" },
                    { icon: "Clock3", label: "Режим работы", val: "Пн–Пт: 9:00 – 18:00" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}
                      >
                        <Icon name={c.icon} size={18} color="var(--gold)" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--steel)", fontFamily: "'Oswald', sans-serif" }}>
                          {c.label}
                        </div>
                        <div className="text-sm" style={{ color: "#D4C9B0" }}>{c.val}</div>
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
        <span style={{ color: "rgba(212,201,176,0.3)" }}>/</span>
        <span className="text-sm" style={{ color: "rgba(212,201,176,0.3)" }}>
          0{SECTIONS.length}
        </span>
        <span className="text-xs tracking-widest uppercase ml-2 hidden md:block" style={{ color: "rgba(212,201,176,0.4)" }}>
          {SECTIONS[currentSection]}
        </span>
      </div>
    </div>
  );
}