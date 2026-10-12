import Link from "next/link";
import LeadForm from "../components/LeadForm";

const solutions = [
  { n: "01", title: "Стратегия и рост", text: "Разберите позиционирование, конкурентов, воронку и найдите приоритетные точки роста." },
  { n: "02", title: "Маркетинг и контент", text: "Подготовьте идеи для рекламы, офферы, тексты и понятный план продвижения." },
  { n: "03", title: "Визуальные материалы", text: "Работайте с изображениями, анализируйте фотографии и создавайте новые визуалы." },
  { n: "04", title: "Презентации", text: "Загружайте PPTX, улучшайте структуру и собирайте презентации для клиентов." },
];

const steps = [
  { n: "01", title: "Опишите задачу", text: "Расскажите о продукте, целях и текущих сложностях. Можно прикрепить материалы." },
  { n: "02", title: "Получите разбор", text: "Motin AI поможет структурировать ситуацию и предложит конкретные действия." },
  { n: "03", title: "Двигайтесь дальше", text: "Используйте результат самостоятельно или подключите команду Motin Group." },
];

const plans = [
  { title: "Старт", count: "20", price: "40 000 ₽", desc: "Для проверки дополнительного канала привлечения." },
  { title: "Рост", count: "40", price: "60 000 ₽", desc: "Для системного пополнения воронки продаж.", featured: true },
  { title: "Масштаб", count: "80", price: "100 000 ₽", desc: "Для команд, которым нужен стабильный поток обращений." },
];

export default function HomePage() {
  return (
    <main className="motin-page" id="top">
      <header className="site-header">
        <div className="shell header-inner">
          <Link href="/" className="brand" aria-label="Motin AI — главная">
            <span className="brand-mark"><span>M</span></span>
            <span className="brand-wordmark">MOTIN <span>AI</span></span>
          </Link>
          <nav className="nav" aria-label="Основная навигация">
            <a href="#abilities">Возможности</a>
            <a href="#process">Как работает</a>
            <a href="#leadgen">Для бизнеса</a>
            <a href="#pricing">Тарифы</a>
          </nav>
          <Link className="button button-primary header-cta" href="/chat">Открыть Motin AI <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <section className="motin-hero" aria-labelledby="hero-title">
        <div className="hero-aura" aria-hidden="true" />
        <div className="shell motin-hero-content">
          <div className="hero-text-block">
            <div className="overline"><span className="overline-line" /> INTELLIGENCE FOR BUSINESS</div>
            <h1 id="hero-title">Новый уровень <em>мышления</em> для вашего бизнеса.</h1>
            <p className="hero-subtitle">Motin AI — ваш интеллектуальный партнёр в маркетинге. Находите решения, создавайте материалы и превращайте идеи в действия. Когда нужна реализация — рядом команда Motin Group.</p>
            <div className="hero-actions">
              <Link href="/chat" className="button button-primary button-large">Начать диалог <span aria-hidden="true">↗</span></Link>
              <a href="#leadgen" className="button button-secondary button-large">Решения для бизнеса <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-trust"><span className="signal-dot" /> ИИ-консультант · Маркетинг · Лидогенерация</div>
          </div>
          <div className="hero-art" role="img" aria-label="Мужской образ цифрового консультанта Motin AI">
            <div className="hero-photo" />
            <div className="hero-art-overlay" />
            <div className="art-topline">MOTIN / INTELLIGENCE SYSTEM</div>
            <div className="art-orbit art-orbit-one" />
            <div className="art-orbit art-orbit-two" />
            <div className="art-label"><span className="art-label-mark">M</span><div><strong>MOTIN AI</strong><small>Ваш цифровой советник</small></div></div>
          </div>
        </div>
        <div className="shell hero-rail"><span>01 / ИИ-КОНСУЛЬТАНТ</span><span>02 / МАРКЕТИНГ</span><span>03 / MOTIN GROUP</span><span>ПРОКРУТИТЬ ВНИЗ ↓</span></div>
      </section>

      <section id="abilities" className="motin-section">
        <div className="shell">
          <div className="section-kicker">/ ВОЗМОЖНОСТИ</div>
          <div className="section-heading-row"><h2>Один диалог.<br /><em>Больше возможностей.</em></h2><p>От первого вопроса до готовых решений. Motin AI помогает держать фокус на результате, а не на сложных инструментах.</p></div>
          <div className="motin-feature-grid">{solutions.map((item) => <article key={item.n} className="motin-feature"><span className="feature-number">{item.n}</span><div className="feature-symbol" aria-hidden="true">✳</div><h3>{item.title}</h3><p>{item.text}</p><Link href="/chat" className="subtle-link">Обсудить в чате ↗</Link></article>)}</div>
        </div>
      </section>

      <section className="motin-section motin-process" id="process">
        <div className="shell">
          <div className="section-kicker">/ КАК ЭТО РАБОТАЕТ</div>
          <div className="section-heading-row"><h2>От вопроса<br /><em>к ясному плану.</em></h2><p>Никакого сложного старта. Опишите ситуацию обычными словами — начнём с самого важного.</p></div>
          <div className="motin-steps">{steps.map((step) => <article key={step.n}><span className="step-number">{step.n} /</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        </div>
      </section>

      <section id="leadgen" className="motin-section leadgen-section">
        <div className="shell leadgen-layout">
          <div>
            <div className="section-kicker">/ УСЛУГИ MOTIN GROUP</div>
            <h2>ИИ подскажет.<br /><em>Команда реализует.</em></h2>
            <p className="leadgen-intro">Нужны не только идеи, но и новые клиенты? Motin Group помогает с лидогенерацией: от анализа ниши и запуска привлечения до квалификации обращений и передачи заявок отделу продаж.</p>
            <div className="leadgen-points"><span>Анализ ниши и аудитории</span><span>Подбор каналов привлечения</span><span>Квалификация обращений</span><span>Передача целевых лидов</span></div>
            <div className="leadgen-test-note">Для услуги лидогенерации предусмотрен бесплатный тест на 7 дней. Условия теста уточняются с командой.</div>
          </div>
          <aside className="leadgen-panel" id="contact">
            <div className="panel-kicker">ОБСУДИМ ВАШ ПРОЕКТ</div>
            <h3>Начнём с вашей задачи.</h3>
            <p>Оставьте контакты — команда свяжется с вами после подключения приёма заявок.</p>
            <LeadForm />
          </aside>
        </div>
      </section>

      <section id="pricing" className="motin-section pricing-section">
        <div className="shell">
          <div className="section-kicker">/ ЛИДОГЕНЕРАЦИЯ</div>
          <div className="section-heading-row"><h2>Прозрачный масштаб.<br /><em>Понятные тарифы.</em></h2><p>Тарифы относятся к услугам Motin Group, а не к использованию ИИ-чата. Финальные условия согласовываются отдельно.</p></div>
          <div className="motin-pricing-grid">{plans.map((plan) => <article key={plan.title} className={plan.featured ? "motin-plan featured" : "motin-plan"}><span className="plan-name">{plan.title}</span>{plan.featured && <span className="plan-tag">ПОПУЛЯРНЫЙ</span>}<div className="plan-count">{plan.count} <small>лидов</small></div><div className="plan-price">{plan.price}</div><p>{plan.desc}</p><a href="#contact" className="button button-secondary">Обсудить тариф ↗</a></article>)}</div>
        </div>
      </section>

      <section className="motin-final-cta">
        <div className="shell final-inner"><div><div className="section-kicker">/ НАЧНИТЕ СЕЙЧАС</div><h2>Ваш следующий шаг<br /><em>начинается с диалога.</em></h2><p>Опишите идею, задачу или проблему. Motin AI поможет найти отправную точку.</p></div><Link href="/chat" className="button button-primary button-large">Начать диалог ↗</Link></div>
      </section>
      <footer className="motin-footer"><div className="shell footer-inner"><div className="footer-brand"><span className="brand-mark"><span>M</span></span><span>MOTIN AI <small>by Motin Group</small></span></div><div>Интеллект для бизнеса. Решения для роста.</div><a href="#top">Наверх ↑</a><span>© {new Date().getFullYear()} Motin AI</span></div></footer>
    </main>
  );
}
