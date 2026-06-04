/* global React, useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakToggle,
   OwlMark, IconClean, IconBuild, IconMaint, Check, Arrow, Shield, Bolt, Cpu, Disk, Monitor, Pin,
   Whatsapp, Instagram, Facebook, TikTok, Menu, Close */
const { useState, useEffect, useRef } = React;

// logo source — uses inlined blob when bundled standalone, else the file path
const LOGO_SRC = (typeof window !== 'undefined' && window.__resources && window.__resources.logoFull) || 'assets/noctua-logo-full.png';

// ---------- real contact data ----------
const WA_NUMBER = '5516997727213';
const WA_MSG = encodeURIComponent('Olá, Noctua! Meu computador está com um problema e preciso de ajuda. 🦉');
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;
const SOCIAL = {
  instagram: 'https://www.instagram.com/noctuaassistencia',
  facebook: 'https://www.facebook.com/profile.php?id=61577053325074&mibextid=wwXIfr',
  tiktok: 'https://www.tiktok.com/@noctua.assistncia'
};
const TEAM = [
{ h: '@_fernandobelotti', url: 'https://www.instagram.com/_fernandobelotti' },
{ h: '@pedro.ferreira_1', url: 'https://www.instagram.com/pedro.ferreira_1' },
{ h: '@jao.viquitor', url: 'https://www.instagram.com/jao.viquitor' }];


const NAV = [
{ id: 'inicio', label: 'Início' },
{ id: 'servicos', label: 'Serviços' },
{ id: 'sobre', label: 'Sobre' }];


const SERVICES = [
{
  tag: '01 · Hardware', icon: IconClean, title: 'Limpeza',
  desc: 'Performance e temperatura sob controle com limpeza completa e cuidadosa.',
  items: ['Limpeza completa interna e externa', 'Troca de pasta térmica', 'Gabinete, placa-mãe e placa de vídeo', 'Fans e sistema de ventilação']
},
{
  tag: '02 · Upgrade', icon: IconBuild, title: 'Montagem',
  desc: 'Monte ou evolua sua máquina com peças certas e cabos impecáveis.',
  items: ['Montagem de PCs novos', 'Upgrades de CPU e memória', 'SSD / HD / NVMe', 'Fontes, fans e coolers', 'Organização de cabos e testes']
},
{
  tag: '03 · Software', icon: IconMaint, title: 'Manutenção',
  desc: 'Sistema rápido, seguro e do jeito que deveria funcionar.',
  items: ['Formatação com backup', 'Ativação e configuração do Windows', 'Drivers e programas utilitários', 'Antivírus e otimização de segurança']
}];


const ABOUT_POINTS = [
{ icon: Shield, b: 'Preventiva & corretiva', s: 'PCs, notebooks e redes' },
{ icon: Disk, b: 'Recuperação de dados', s: 'Arquivos e backups' },
{ icon: Bolt, b: 'Remoção de vírus', s: 'Segurança e limpeza' },
{ icon: Cpu, b: 'Upgrades sob medida', s: 'Mais performance' }];


// ---------- scroll reveal hook (rect-based; reliable across environments) ----------
function useReveal() {
  useEffect(() => {
    let raf = 0;
    const check = () => {
      const h = window.innerHeight;
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        if (el.getBoundingClientRect().top < h * 0.9) el.classList.add('in');
      });
    };
    const onScroll = () => {cancelAnimationFrame(raf);raf = requestAnimationFrame(check);};
    // reveal what's already on screen, then watch scroll
    check();
    requestAnimationFrame(check);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {window.removeEventListener('scroll', onScroll);window.removeEventListener('resize', onScroll);cancelAnimationFrame(raf);};
  }, []);
}

// ---------- header ----------
function Header({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const go = (e, id) => {e.preventDefault();setOpen(false);onNav(id);};
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap header-inner">
        <a className="brand" href="#inicio" onClick={(e) => go(e, 'inicio')}>
          <img src={LOGO_SRC} alt="Noctua Solutions" className="brand-img" />
        </a>
        <nav className="nav">
          {NAV.map((n) =>
          <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'active' : ''} onClick={(e) => go(e, n.id)}>{n.label}</a>
          )}
        </nav>
        <div className="header-cta">
          <a className="btn btn-primary" href={WA_LINK} target="_blank" rel="noopener"><Whatsapp /> Contato</a>
          <button className="menu-btn" aria-label="Abrir menu" onClick={() => setOpen(true)}><Menu /></button>
        </div>
      </div>
      <div className={`drawer ${open ? 'open' : ''}`}>
        <div className="drawer-scrim" onClick={() => setOpen(false)} />
        <div className="drawer-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span className="brand-name" style={{ fontSize: 18 }}>NOCTUA</span>
            <button className="menu-btn" style={{ display: 'grid' }} aria-label="Fechar" onClick={() => setOpen(false)}><Close /></button>
          </div>
          {NAV.map((n) => <a key={n.id} href={`#${n.id}`} onClick={(e) => go(e, n.id)}>{n.label}</a>)}
          <a href="#contato" onClick={(e) => go(e, 'contato')}>Contato</a>
          <a className="btn btn-primary btn-lg" style={{ marginTop: 18, justifyContent: 'center' }} href={WA_LINK} target="_blank" rel="noopener"><Whatsapp /> Fale no WhatsApp</a>
        </div>
      </div>
    </header>);

}

// ---------- hero chips data ----------
// positions[setIndex][chipIndex] — chips appear at different spots per set
const CHIP_POSITIONS = [
  // set 0 — top-esq · dir-meio · baixo-esq
  [
    { top: '22px',    left: '-10px'  },
    { bottom: '58px', right: '-14px' },
    { bottom: '4px',  left: '36px'  },
  ],
  // set 1 — top-dir · esq-meio · baixo-dir
  [
    { top: '18px',    right: '-12px' },
    { bottom: '62px', left: '-18px'  },
    { bottom: '6px',  right: '22px'  },
  ],
  // set 2 — top-centro-esq · esq-baixo · dir-centro
  [
    { top: '10px',    left: '20px'   },
    { bottom: '20px', left: '-16px'  },
    { top: '40%',     right: '-14px' },
  ],
];

const CHIP_SETS = [
  [
    { icon: Bolt,      text: 'Diagnóstico rápido'   },
    { icon: Shield,    text: 'Backup garantido'      },
    { icon: Cpu,       text: 'Upgrades sob medida'   },
  ],
  [
    { icon: IconClean, text: 'Limpeza + pasta térmica' },
    { icon: IconBuild, text: 'Montagem de PCs'         },
    { icon: IconMaint, text: 'Formatação + backup'     },
  ],
  [
    { icon: Disk,      text: 'Recuperação de dados' },
    { icon: Shield,    text: 'Remoção de vírus'     },
    { icon: Monitor,   text: 'Atendimento remoto'   },
  ],
];

// ---------- hero ----------
function Hero({ onNav }) {
  const [chipIdx, setChipIdx] = useState(0);
  const [chipsVis, setChipsVis] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setChipsVis(false);
      setTimeout(() => {
        setChipIdx(i => (i + 1) % CHIP_SETS.length);
        setChipsVis(true);
      }, 600);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="inicio" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow reveal">ASSISTÊNCIA TÉCNICA
</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>
            Bem-vindo(a)<br />à <span className="grad">Noctua</span>
          </h1>
          <p className="lede reveal">
            Soluções para os problemas do seu computador, uma equipe de especialistas
            pronta para ajudar com rapidez, precisão e cuidado. De dia ou de noite.
          </p>
          <div className="hero-cta reveal">
            <a className="btn btn-primary btn-lg" href={WA_LINK} target="_blank" rel="noopener">
              <span className="online-dot" /><Whatsapp /> Fale conosco no WhatsApp
            </a>
            <a className="btn btn-ghost btn-lg" href="#servicos" onClick={(e) => {e.preventDefault();onNav('servicos');}}>
              Ver serviços <Arrow />
            </a>
          </div>
          <div className="hero-trust reveal">
            <div className="trust-item"><b>24h</b><span>Resposta no WhatsApp</span></div>
            <div className="trust-item"><b>3 frentes</b><span>Limpeza · Montagem · Manutenção</span></div>
            <div className="trust-item"><b>Todos os públicos</b><span>Residencial, empresas e autônomos</span></div>
          </div>
        </div>
        <div className="hero-visual reveal">
          <div className="halo" />
          <div className="pulse-ring" />
          <div className="pulse-ring pr2" />
          <div className="pulse-ring pr3" />
          <div className="owl-ring r2" />
          <div className="owl-ring r1" />
          <div className="owl-orb"><img src={LOGO_SRC} alt="Noctua Solutions" className="orb-logo" /></div>
          {CHIP_SETS[chipIdx].map((chip, i) => {
            const Icon = chip.icon;
            return (
              <div key={i} className={`chip-wrap c${i + 1}`} style={CHIP_POSITIONS[chipIdx][i]}>
                <div
                  className={`chip${chipsVis ? '' : ' chip-hidden'}`}
                  style={{ transitionDelay: chipsVis ? `${i * 80}ms` : '0ms' }}
                >
                  <span className="chip-icon"><Icon /></span>
                  {chip.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>);
}

// ---------- services ----------
function Services() {
  return (
    <section id="servicos" className="block">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">O que fazemos</span>
          <h2 className="section-h">Nossos serviços</h2>
          <p>Da poeira no cooler ao Windows travando: cobrimos o ciclo completo do seu equipamento, com diagnóstico honesto e execução caprichada.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <article key={s.title} className="svc-card reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="svc-icon"><Icon /></div>
                <span className="svc-tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p style={{ color: 'var(--text-2)', fontSize: 15.5, margin: '8px 0 0' }}>{s.desc}</p>
                <ul className="svc-list">
                  {s.items.map((it) => <li key={it}><Check /> {it}</li>)}
                </ul>
              </article>);

          })}
        </div>
      </div>
    </section>);

}

// ---------- about ----------
function About() {
  return (
    <section id="sobre" className="block">
      <div className="wrap about-grid">
        <div className="reveal">
          <span className="eyebrow">Sobre nós</span>
          <h2 className="section-h" style={{ marginTop: 14 }}>Tecnologia com olhar atento</h2>
          <p className="lede" style={{ marginTop: 18 }}>
            A Noctua é uma startup de assistência técnica focada em manutenção preventiva e
            corretiva de computadores, notebooks e redes. Cuidamos de recuperação de dados,
            remoção de vírus e upgrades, atendendo clientes residenciais, empresas e autônomos
            com agilidade e transparência.
          </p>
          <div className="about-points">
            {ABOUT_POINTS.map((p) => {
              const Icon = p.icon;
              return (
                <div className="about-point" key={p.b}>
                  <Icon />
                  <div><b>{p.b}</b><span>{p.s}</span></div>
                </div>);

            })}
          </div>
          <p className="about-tag">Seu computador parou?<br /><span className="grad">Conte com a gente.</span></p>
        </div>
        <div className="about-visual reveal">
          <div className="about-orbit" />
          <div className="ph">
            <Monitor />
            <span>Imagem de apoio<br />equipe / bancada de reparo</span>
          </div>
        </div>
      </div>
    </section>);

}

// ---------- contact + footer ----------
function ContactFooter() {
  return (
    <footer id="contato">
      <div className="wrap contact">
        <div className="contact-card reveal">
          <span className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>Vamos resolver</span>
          <h2 style={{ marginTop: 16 }}>Fale com a Noctua agora</h2>
          <p>Mande uma mensagem no WhatsApp com o que está acontecendo. Respondemos rápido e já adiantamos o diagnóstico.</p>
          <div className="contact-cta">
            <a className="btn btn-primary btn-lg" href={WA_LINK} target="_blank" rel="noopener">
              <span className="online-dot" /><Whatsapp /> Chamar no WhatsApp
            </a>
            <a className="btn btn-ghost btn-lg" href={SOCIAL.instagram} target="_blank" rel="noopener"><Instagram /> Ver no Instagram</a>
          </div>
        </div>

        <div className="footer">
          <div className="footer-top">
            <div className="footer-brand">
              <a className="brand" href="#inicio" style={{ pointerEvents: 'none' }}>
                <img src={LOGO_SRC} alt="Noctua Solutions" className="brand-img" style={{ height: 58 }} />
              </a>
              <p>Assistência técnica e manutenção de computadores. Soluções rápidas, eficientes e de qualidade para residências, empresas e autônomos.</p>
              <div className="socials">
                <a className="social" href={WA_LINK} target="_blank" rel="noopener" aria-label="WhatsApp"><Whatsapp /></a>
                <a className="social" href={SOCIAL.instagram} target="_blank" rel="noopener" aria-label="Instagram"><Instagram /></a>
                <a className="social" href={SOCIAL.facebook} target="_blank" rel="noopener" aria-label="Facebook"><Facebook /></a>
                <a className="social" href={SOCIAL.tiktok} target="_blank" rel="noopener" aria-label="TikTok"><TikTok /></a>
              </div>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <h4>Navegação</h4>
                {NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
                <a href="#contato">Contato</a>
              </div>
              <div className="footer-col">
                <h4>Serviços</h4>
                <a href="#servicos">Limpeza</a>
                <a href="#servicos">Montagem</a>
                <a href="#servicos">Manutenção</a>
                <a href="#servicos">Recuperação de dados</a>
              </div>
              <div className="footer-col">
                <h4>Contato</h4>
                <a href={WA_LINK} target="_blank" rel="noopener">WhatsApp · (16) 99772-7213</a>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener">@noctuaassistencia</a>
                <span><Pin style={{ width: 14, height: 14, verticalAlign: '-2px', marginRight: 6 }} />Atendimento local e remoto</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Noctua Solutions · Todos os direitos reservados</span>
            <div className="team-credits">
              <span style={{ color: 'var(--text-muted)' }}>Equipe:</span>
              {TEAM.map((t) => <a key={t.h} href={t.url} target="_blank" rel="noopener">{t.h}</a>)}
            </div>
          </div>
        </div>
      </div>
    </footer>);

}

// ---------- scroll progress ----------
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setPct(max <= 0 ? 0 : (scrollTop / max) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-bar" style={{ width: `${pct}%` }} />;
}

// ---------- tweaks ----------
const ACCENTS = {
  Violeta: { a: '#8B5CF6', a2: '#22D3EE', deep: '#6D3FD1' },
  Ciano: { a: '#22D3EE', a2: '#6366F1', deep: '#0EA5C4' },
  Azul: { a: '#3B82F6', a2: '#22D3EE', deep: '#2563EB' },
  Indigo: { a: '#7C7BFF', a2: '#C084FC', deep: '#5B5BE0' }
};
function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16 & 255}, ${n >> 8 & 255}, ${n & 255}, ${a})`;
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "Violeta",
  "vibe": "glow",
  "stars": true
} /*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useState('inicio');
  useReveal();

  // apply accent + vibe to :root / body
  useEffect(() => {
    const c = ACCENTS[t.accent] || ACCENTS.Violeta;
    const r = document.documentElement.style;
    r.setProperty('--accent', c.a);
    r.setProperty('--accent-2', c.a2);
    r.setProperty('--accent-deep', c.deep);
    r.setProperty('--accent-soft', hexA(c.a, 0.14));
    r.setProperty('--accent-glow', hexA(c.a, 0.40));
    document.body.dataset.vibe = t.vibe;
    document.body.dataset.stars = t.stars ? 'on' : 'off';
  }, [t.accent, t.vibe, t.stars]);

  // active section via scroll position
  useEffect(() => {
    const ids = ['inicio', 'servicos', 'sobre', 'contato'];
    let raf = 0;
    const update = () => {
      const line = window.scrollY + window.innerHeight * 0.36;
      let cur = 'inicio';
      ids.forEach((id) => {const el = document.getElementById(id);if (el && el.offsetTop <= line) cur = id;});
      setActive(cur === 'contato' ? 'sobre' : cur);
    };
    const onScroll = () => {cancelAnimationFrame(raf);raf = requestAnimationFrame(update);};
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {window.removeEventListener('scroll', onScroll);cancelAnimationFrame(raf);};
  }, []);

  const onNav = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <React.Fragment>
      <ScrollProgress />
      <div className="night-bg" />
      <div className="shell">
        <Header active={active} onNav={onNav} />
        <main>
          <Hero onNav={onNav} />
          <Services />
          <About />
        </main>
        <ContactFooter />
      </div>
      <div className="fab-wrap">
        <span className="fab-tip">Fale conosco agora</span>
        <a className="fab" href={WA_LINK} target="_blank" rel="noopener" aria-label="WhatsApp"><Whatsapp /></a>
      </div>

      <TweaksPanel>
        <TweakSection label="Cor de destaque" />
        <TweakRadio label="Accent" value={t.accent} options={Object.keys(ACCENTS)} onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Atmosfera noturna" />
        <TweakRadio label="Fundo" value={t.vibe} options={['glow', 'grid']} onChange={(v) => setTweak('vibe', v)} />
      </TweaksPanel>
    </React.Fragment>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);