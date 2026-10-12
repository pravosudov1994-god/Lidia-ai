import Link from "next/link";
import LeadForm from "../components/LeadForm";

type IconName = "search" | "target" | "inbox" | "headset" | "check" | "bolt" | "clock" | "chart" | "layers" | "shield" | "megaphone" | "monitor" | "users" | "grid" | "arrow" | "spark";

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  switch (name) {
    case "search": return <svg {...common}><circle cx="10.6" cy="10.6" r="6.6"/><path d="m16 16 5 5M7 12V9m3 3V6m3 6V9"/></svg>;
    case "target": return <svg {...common}><circle cx="11.5" cy="12" r="9"/><circle cx="11.5" cy="12" r="4.5"/><circle cx="11.5" cy="12" r="1"/><path d="m15 8 6-6"/></svg>;
    case "inbox": return <svg {...common}><rect x="3" y="5" width="18" height="15" rx="2"/><path d="m4 8 8 6 8-6"/></svg>;
    case "headset": return <svg {...common}><path d="M4 13v-2a8 8 0 0 1 16 0v2M4 13h3v6H4zM17 13h3v6h-3zM17 19c0 2-2 2-5 2"/></svg>;
    case "check": return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m8 12 2.6 2.6L16.5 9"/></svg>;
    case "bolt": return <svg {...common}><path d="M13 2 4 14h7l-1 8 10-13h-7z"/></svg>;
    case "clock": return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>;
    case "chart": return <svg {...common}><path d="M4 20V12m5 8V6m5 14v-9m5 9V3M3 10l5-5 6 5 7-7"/></svg>;
    case "layers": return <svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/></svg>;
    case "shield": return <svg {...common}><path d="m12 2 8 4v6c0 5-3 8-8 10-5-2-8-5-8-10V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>;
    case "megaphone": return <svg {...common}><path d="M4 10h4l11-5v14L8 14H4zM8 14l2 6h3l-2-5"/></svg>;
    case "monitor": return <svg {...common}><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 22h8m-4-4v4"/></svg>;
    case "users": return <svg {...common}><circle cx="9" cy="8" r="3"/><path d="M2 21c.5-4 3-7 7-7s6.5 3 7 7M16 5a3 3 0 0 1 0 6m1 3c3 0 5 3 5 7"/></svg>;
    case "grid": return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case "arrow": return <svg {...common}><path d="M4 12h16m-7-7 7 7-7 7"/></svg>;
    case "spark": return <svg {...common}><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/></svg>;
  }
}

const steps: { number: string; title: string; text: string; icon: IconName }[] = [
  { number: "01", title: "Анализ ниши", text: "Изучаем рынок, конкурентов, спрос, продукт и портрет целевой аудитории.", icon: "search" },
  { number: "02", title: "Запуск привлечения", text: "Создаём рекламные материалы, посадочные страницы и запускаем подходящие каналы.", icon: "target" },
  { number: "03", title: "Сбор обращений", text: "Заинтересованные пользователи попадают в единый поток для дальнейшей обработки.", icon: "inbox" },
  { number: "04", title: "Квалификация", text: "Колл-центр уточняет потребность, подтверждает интерес и отсеивает нецелевые контакты.", icon: "headset" },
  { number: "05", title: "Передача лидов", text: "Передаём квалифицированные лиды каждый рабочий день в CRM или Excel.", icon: "check" },
];

const benefits: { title: string; text: string; icon: IconName }[] = [
  { title: "Качественные лиды", text: "Целевые и проверенные контакты с подтверждённым интересом.", icon: "target" },
  { title: "Экономия времени", text: "Снимаем с команды первичный поиск и фильтрацию обращений.", icon: "clock" },
  { title: "Дополнительный канал", text: "Новый источник клиентов без отказа от уже работающей рекламы.", icon: "chart" },
  { title: "Интеграция и контроль", text: "Передаём обращения в CRM или Excel и делаем обработку прозрачной.", icon: "layers" },
  { title: "Колл-центр", text: "Живая проверка потребности и интереса до передачи лида.", icon: "headset" },
  { title: "Контроль качества", text: "Проверяем лиды перед передачей в отдел продаж.", icon: "shield" },
];

const plans = [
  { count: 20, price: "40 000 ₽", type: "СТАРТ", featured: false },
  { count: 40, price: "60 000 ₽", type: "РОСТ", featured: true },
  { count: 80, price: "100 000 ₽", type: "МАСШТАБ", featured: false },
];

const services: { title: string; text: string; icon: IconName }[] = [
  { title: "Рекламные кампании", text: "Аудит, настройка и ведение рекламных каналов.", icon: "megaphone" },
  { title: "Разработка сайтов", text: "Лендинги, корпоративные сайты и интернет-магазины.", icon: "monitor" },
  { title: "Отдел продаж", text: "Найм, обучение, скрипты, KPI и управление.", icon: "users" },
  { title: "CRM и консалтинг", text: "Внедрение CRM, аналитика и аудит бизнес-процессов.", icon: "grid" },
];

export default function HomePage() {
  return (
    <main className="motin-page mg-page" id="top">
      <header className="mg-header">
        <div className="shell mg-header-inner">
          <Link href="/" className="mg-brand" aria-label="Motin AI — главная">
            <span className="mg-brand-icon">M<span>.</span></span>
            <span className="mg-brand-type"><strong>MOTIN <span>AI</span></strong><small>LEAD GENERATION · MOTIN GROUP</small></span>
          </Link>
          <nav className="mg-nav" aria-label="Основная навигация">
            <a href="#how">Как работает</a>
            <a href="#benefits">Преимущества</a>
            <a href="#test">Бесплатный тест</a>
            <a href="#pricing">Тарифы</a>
            <a href="#services">Услуги</a>
          </nav>
          <a href="#lead-form" className="mg-btn mg-btn-primary mg-header-cta">Тест бесплатно <Icon name="arrow" size={16}/></a>
          <details className="mg-menu">
            <summary aria-label="Открыть меню"><span/><span/><span/></summary>
            <nav aria-label="Мобильная навигация">
              <a href="#how">Как работает</a><a href="#benefits">Преимущества</a>
              <a href="#test">Бесплатный тест</a><a href="#pricing">Тарифы</a>
              <a href="#services">Услуги</a><Link href="/chat">ИИ-консультант ↗</Link>
            </nav>
          </details>
        </div>
      </header>

      <section className="mg-hero" aria-labelledby="mg-hero-title">
        <div className="mg-grid-overlay" aria-hidden="true"/>
        <div className="mg-hero-glow" aria-hidden="true"/>
        <div className="shell mg-hero-layout">
          <div className="mg-hero-copy">
            <div className="mg-kicker"><span className="mg-kicker-dot"/> AI + BIG DATA + КОЛЛ-ЦЕНТР <span className="mg-kicker-line"/></div>
            <h1 id="mg-hero-title">Умная <em>лидогенерация</em> для вашего бизнеса</h1>
            <p className="mg-hero-desc">Анализируем нишу, запускаем привлечение, квалифицируем лидов и передаём вашему отделу продаж <strong>целевые заявки с подтверждённым интересом.</strong></p>
            <div className="mg-hero-actions">
              <a href="#lead-form" className="mg-btn mg-btn-primary mg-btn-big">Запустить бесплатный тест <Icon name="arrow" size={18}/></a>
              <a href="#how" className="mg-btn mg-btn-outline mg-btn-big">Как это работает <span className="mg-play">↗</span></a>
            </div>
            <div className="mg-hero-assurance">
              <span><Icon name="check" size={16}/> 7 дней бесплатный тест</span>
              <span><Icon name="check" size={16}/> Квалификация колл-центром</span>
            </div>
          </div>
          <div className="mg-hero-scene" role="img" aria-label="Motin AI — система умной лидогенерации и контроля потока заявок">
            <div className="mg-scene-radar radar-1"/><div className="mg-scene-radar radar-2"/><div className="mg-scene-radar radar-3"/>
            <div className="mg-scene-photo"/>
            <div className="mg-scene-fade"/>
            <div className="mg-scene-top"><span className="mg-led"/> MOTIN AI / LEAD INTELLIGENCE <span>● 24/7</span></div>
            <div className="mg-hud mg-hud-top"><small>МОНИТОРИНГ СИСТЕМЫ</small><strong>24/7</strong><span className="mg-hud-bars"><i/><i/><i/><i/><i/><i/><i/><i/></span></div>
            <div className="mg-hud mg-hud-bottom"><span className="mg-hud-check"><Icon name="check" size={20}/></span><span><small>КВАЛИФИКАЦИЯ</small><strong>Контроль качества</strong></span></div>
            <div className="mg-scene-bottom"><span className="mg-visual-rule"/> СИСТЕМА ПРИВЛЕЧЕНИЯ КЛИЕНТОВ <span className="mg-visual-rule"/></div>
          </div>
        </div>
        <div className="shell mg-metrics" aria-label="Показатели из первой версии сайта">
          <div className="mg-metric"><span className="mg-metric-icon"><Icon name="search" size={25}/></span><div><strong>432+</strong><span>ниши проанализировано</span></div></div>
          <div className="mg-metric"><span className="mg-metric-icon"><Icon name="target" size={25}/></span><div><strong>100+</strong><span>каналов подключено</span></div></div>
          <div className="mg-metric"><span className="mg-metric-icon"><Icon name="clock" size={25}/></span><div><strong>24/7</strong><span>мониторинг рынка</span></div></div>
          <div className="mg-metric"><span className="mg-metric-icon"><Icon name="shield" size={25}/></span><div><strong>100%</strong><span>контроль качества лидов</span></div></div>
        </div>
      </section>

      <section className="mg-ai-strip" id="ai-assistant" aria-labelledby="mg-ai-title">
        <div className="shell mg-ai-layout">
          <div className="mg-ai-orb"><div className="mg-ai-orb-inner"><Icon name="spark" size={33}/></div><span>AI</span></div>
          <div className="mg-ai-copy">
            <span className="mg-overline">ДОПОЛНИТЕЛЬНЫЙ ИНСТРУМЕНТ</span>
            <h2 id="mg-ai-title">Есть вопрос по маркетингу? <em>Спросите Motin AI.</em></h2>
            <p>Обсудите рекламную стратегию, проверьте оффер или найдите точки роста с нашим ИИ-консультантом. Это отдельный бесплатный текстовый чат — услуга лидогенерации остаётся главным направлением.</p>
          </div>
          <Link href="/chat" className="mg-btn mg-btn-outline mg-ai-link">Перейти к ИИ-чату <Icon name="arrow" size={18}/></Link>
        </div>
      </section>

      <section className="mg-section mg-how" id="how">
        <div className="shell">
          <div className="mg-section-head">
            <span className="mg-overline">01 / ПРОЦЕСС</span>
            <h2>Как работает <em>Motin AI</em></h2>
            <p>Пять этапов — от анализа вашего рынка до квалифицированного лида в отделе продаж.</p>
          </div>
          <div className="mg-process-track">
            {steps.map((step) => <article className="mg-process-card" key={step.number}>
              <span className="mg-process-num">{step.number}</span>
              <div className="mg-icon-box"><Icon name={step.icon} size={27}/></div>
              <h3>{step.title}</h3><p>{step.text}</p>
              <span className="mg-process-arrow" aria-hidden="true">→</span>
            </article>)}
          </div>
          <div id="benefits" className="mg-section-head mg-benefit-head">
            <span className="mg-overline">02 / ПРЕИМУЩЕСТВА</span>
            <h2>Почему выбирают <em>Motin AI</em></h2>
            <p>Технологии помогают находить обращения. Люди помогают убедиться, что они действительно целевые.</p>
          </div>
          <div className="mg-benefit-grid">
            {benefits.map((b) => <article className="mg-benefit-card" key={b.title}>
              <div className="mg-icon-box"><Icon name={b.icon} size={25}/></div>
              <h3>{b.title}</h3><p>{b.text}</p>
            </article>)}
          </div>

        </div>
      </section>

      <section className="mg-section mg-test" id="test">
        <div className="shell">
          <div className="mg-test-panel">
            <div className="mg-test-art" aria-hidden="true"><span className="mg-test-ring outer"/><span className="mg-test-ring inner"/><Icon name="clock" size={60}/></div>
            <span className="mg-pill">БЕСПЛАТНЫЙ ТЕСТ · 7 ДНЕЙ</span>
            <h2>Сначала <em>результат</em> —<br/>потом решение</h2>
            <p>Попробуйте Motin AI на своём направлении. Убедитесь в качестве работы на практике — без предоплаты. Условия теста уточним перед запуском.</p>
            <a href="#lead-form" className="mg-btn mg-btn-primary mg-btn-big">Запустить бесплатный тест <Icon name="arrow" size={19}/></a>
            <div className="mg-test-facts">
              <div><strong>7 дней</strong><span>тестовый период</span></div>
              <div><strong>Реальные лиды</strong><span>из вашей ниши</span></div>
              <div><strong>Без предоплаты</strong><span>сначала проверка</span></div>
              <div><strong>1 день</strong><span>настройка системы*</span></div>
            </div>
            <div className="mg-test-note">* Срок настройки зависит от ниши и необходимых интеграций.</div>
          </div>
        </div>
      </section>

      <section className="mg-section mg-pricing" id="pricing">
        <div className="shell">
          <div className="mg-section-head">
            <span className="mg-overline">03 / ТАРИФЫ</span>
            <h2>Выберите <em>пакет лидов</em></h2>
            <p>Понятные пакеты для системной загрузки отдела продаж. Квалификация и передача заявок входят в каждый пакет.</p>
          </div>
          <div className="mg-pricing-grid">
            {plans.map(plan => <article className={plan.featured ? "mg-price-card mg-price-featured" : "mg-price-card"} key={plan.count}>
              {plan.featured && <span className="mg-popular">ПОПУЛЯРНЫЙ ВЫБОР</span>}
              <div className="mg-price-top"><span className="mg-plan-name">{plan.type}</span><span className="mg-price-icon"><Icon name={plan.featured ? "target" : "chart"} size={31}/></span></div>
              <h3>{plan.count} <span>лидов</span></h3>
              <div className="mg-price">{plan.price}</div>
              <div className="mg-price-divider"/>
              <ul>
                <li><Icon name="check" size={17}/> Целевые лиды из вашей ниши</li>
                <li><Icon name="check" size={17}/> Квалификация колл-центром</li>
                <li><Icon name="check" size={17}/> Передача в CRM или Excel</li>
              </ul>
              <a href="#lead-form" className={plan.featured ? "mg-btn mg-btn-primary mg-price-cta" : "mg-btn mg-btn-outline mg-price-cta"}>Выбрать пакет <Icon name="arrow" size={17}/></a>
            </article>)}
          </div>
          <div className="mg-custom-plan"><span className="mg-custom-icon"><Icon name="users" size={29}/></span><div><strong>Нужен больший объём лидов?</strong><p>Подберём индивидуальный пакет под ваш бизнес.</p></div><a href="#lead-form">Обсудить условия <Icon name="arrow" size={17}/></a></div>
        </div>
      </section>

      <section className="mg-section mg-services" id="services">
        <div className="shell">
          <div className="mg-section-head">
            <span className="mg-overline">04 / ЭКОСИСТЕМА MOTIN GROUP</span>
            <h2>Дополнительные <em>услуги</em></h2>
            <p>От привлечения клиентов до настройки бизнес-процессов и работы отдела продаж.</p>
          </div>
          <div className="mg-services-grid">
            {services.map(s => <article className="mg-service" key={s.title}><div className="mg-icon-box"><Icon name={s.icon} size={25}/></div><h3>{s.title}</h3><p>{s.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="mg-section mg-final" id="lead-form">
        <div className="shell mg-final-layout">
          <div className="mg-final-content">
            <span className="mg-overline">05 / ЗАПУСК</span>
            <h2>Готовы увеличить <em>поток клиентов?</em></h2>
            <p>Запустите бесплатный тест Motin AI и оцените качество лидов на своём направлении. Начнём с короткого разговора о вашей нише и задаче.</p>
            <div className="mg-final-points"><span><Icon name="check" size={18}/> Целевые заявки</span><span><Icon name="check" size={18}/> Квалификация</span><span><Icon name="check" size={18}/> Без предоплаты за тест</span></div>
            <div className="mg-final-line"><span>AI + BIG DATA</span><span>×</span><span>ЛЮДИ И ЭКСПЕРТИЗА</span></div>
          </div>
          <aside className="mg-form-card" aria-labelledby="mg-form-title">
            <div className="mg-form-top"><span className="mg-kicker-dot"/><span>ОСТАВИТЬ ЗАЯВКУ</span></div>
            <h3 id="mg-form-title">Получите бесплатный тест</h3>
            <p>Расскажите о своём бизнесе. Подберём подходящий формат привлечения лидов.</p>
            <LeadForm/>
            <p className="mg-form-note">Отправка заявки доступна после подключения приёма обращений в Telegram / CRM.</p>
          </aside>
        </div>
      </section>

      <footer className="mg-footer">
        <div className="shell mg-footer-inner">
          <div className="mg-footer-brand"><span className="mg-brand-icon">M<span>.</span></span><span><strong>MOTIN AI</strong><small>by Motin Group</small></span></div>
          <p>Лидогенерация, колл-центр и развитие бизнеса.</p>
          <div className="mg-footer-links"><a href="#how">Как работает</a><a href="#pricing">Тарифы</a><Link href="/chat">ИИ-консультант</Link><a href="#top">Наверх ↑</a></div>
          <span className="mg-copyright">© {new Date().getFullYear()} Motin AI</span>
        </div>
      </footer>
    </main>
  );
}
