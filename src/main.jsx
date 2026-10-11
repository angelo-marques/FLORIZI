import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Check, ChevronDown, Clock3, Camera, MapPin, Menu, MessageCircle, Play, Search, ShieldCheck, Sparkles, Star, X } from 'lucide-react';
import './styles.css';

const imageUrls = {
  hero: '/FLORIZI/imagens/Florizi%20(13).jpg',
  detail: '/FLORIZI/imagens/Florizi%20(27).jpg',
  ring: '/FLORIZI/imagens/Florizi%20(21).jpg',
  people: '/FLORIZI/imagens/Florizi%20(26).jpg',
  gift: '/FLORIZI/imagens/Florizi%20(19).jpg',
  watch: '/FLORIZI/imagens/Florizi%20(20).jpg',
  necklace: '/FLORIZI/imagens/Florizi%20(16).jpg',
};

const products = [
  { name: 'Aliança Essenza', category: 'Alianças', desc: 'Prata 925 • acabamento acetinado', image: imageUrls.ring, tag: 'Mais escolhida', sourceUrl: 'https://www.instagram.com/p/C8hrZO7RaWU/' },
  { name: 'Anel Aurora', category: 'Anéis', desc: 'Delicadeza para todos os dias', image: imageUrls.detail, tag: 'Novo', sourceUrl: 'https://www.instagram.com/useflorizi/' },
  { name: 'Colar Signo', category: 'Colares', desc: 'Um símbolo só seu, em prata 925', image: imageUrls.necklace, tag: 'Presente', sourceUrl: 'https://www.instagram.com/useflorizi/' },
  { name: 'Argola Lumière', category: 'Brincos', desc: 'Leve, marcante e versátil', image: imageUrls.gift, tag: '', sourceUrl: 'https://www.instagram.com/useflorizi/' },
  { name: 'Relógio Classic', category: 'Relógios', desc: 'Precisão e estilo em cada detalhe', image: imageUrls.watch, tag: 'Curadoria', sourceUrl: 'https://www.instagram.com/useflorizi/' },
  { name: 'Pulseira Afeto', category: 'Pulseiras', desc: 'Para presentear quem importa', image: imageUrls.hero, tag: '', sourceUrl: 'https://www.instagram.com/useflorizi/' },
];

const categories = ['Todos', 'Alianças', 'Anéis', 'Colares', 'Brincos', 'Pulseiras', 'Relógios'];
const whatsappNumber = '5575999492684'; // confirmar antes do lançamento

function App() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [faqOpen, setFaqOpen] = useState(0);
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({ name: '', message: '' });

  const filteredProducts = useMemo(() => activeCategory === 'Todos' ? products : products.filter((p) => p.category === activeCategory), [activeCategory]);

  const makeWhatsAppUrl = (message) => whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}` : '#contato';
  const reserve = (productName = '') => {
    const message = productName ? `Olá, quero reservar: ${productName}` : `Olá, quero conhecer a Florizi`;
    if (!whatsappNumber) {
      setNotice('Número do WhatsApp aguardando confirmação — o botão já está preparado para ativação.');
      document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.open(makeWhatsAppUrl(message), '_blank');
  };
  const submitForm = (event) => {
    event.preventDefault();
    const message = `Olá, sou ${form.name}. ${form.message}`;
    if (!whatsappNumber) {
      setNotice('Formulário pronto: confirme o número do WhatsApp para ativar o envio direto.');
      return;
    }
    window.open(makeWhatsAppUrl(message), '_blank');
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a href="#inicio" className="brand" aria-label="Florizi início"><img className="logo-symbol" src="/FLORIZI/florizi-logo.png" alt="" /><span>florizi</span></a>
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#catalogo" onClick={() => setMenuOpen(false)}>Coleção</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>A Florizi</a>
          <a href="#visite" onClick={() => setMenuOpen(false)}>Visite a loja</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
        </nav>
        <a href={makeWhatsAppUrl('Olá, quero falar com a Florizi')} onClick={(e) => { if (!whatsappNumber) { e.preventDefault(); reserve(); } }} className="top-cta">Falar com a gente <ArrowUpRight size={16} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> joias que guardam histórias</p>
            <h1>O brilho de <em>ser você.</em></h1>
            <p className="hero-text">Uma curadoria de joias, prata 925, semijoias, relógios e presentes para celebrar o que torna cada momento único.</p>
            <div className="hero-actions"><button className="button button-primary" onClick={() => document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth' })}>Ver coleção <ArrowUpRight size={17} /></button><a className="button button-ghost" href="#visite"><MapPin size={17} /> Como chegar</a></div>
            <div className="social-proof"><div className="avatar-stack"><span>F</span><span>L</span><span>+</span></div><div><strong>14 mil pessoas</strong><small>acompanham a Florizi no Instagram <a href="https://www.instagram.com/useflorizi/" target="_blank" rel="noreferrer">@useflorizi</a></small></div></div>
          </div>
          <div className="hero-visual"><div className="hero-image-wrap"><img src={imageUrls.hero} alt="Detalhe de joias douradas da Florizi" /><div className="hero-floating-card"><span className="floating-label">a escolha da vez</span><strong>Peças que<br /><em>falam por você</em></strong><a href="#catalogo">Explorar seleção <ArrowUpRight size={14} /></a></div></div><div className="vertical-note">EUCLIDES DA CUNHA · BA <span>✳</span> DESDE 2009</div></div>
        </section>

        <section className="local-banner"><div className="local-icon"><Clock3 size={20} /></div><div><strong>Retire hoje na Florizi</strong><span>Reserve sua peça e prepare seu presente em até 1 hora.</span></div><button onClick={() => reserve()}>Reservar uma peça <ArrowUpRight size={16} /></button></section>

        <section className="catalog section-pad" id="catalogo">
          <div className="section-heading"><div><p className="eyebrow">uma seleção para cada momento</p><h2>Escolha o que <em>te representa.</em></h2></div><p>Da primeira joia ao presente que vira memória: descubra peças selecionadas para acompanhar a sua história.</p></div>
          <div className="category-row">{categories.map((category) => <button key={category} className={activeCategory === category ? 'category active' : 'category'} onClick={() => setActiveCategory(category)}>{category}</button>)}<span className="catalog-count">{filteredProducts.length} peças em destaque</span></div>
          <div className="product-grid">{filteredProducts.map((product) => <article className="product-card" key={product.name}><div className="product-image"><img src={product.image} alt={product.name} /><span className="product-heart">♡</span>{product.tag && <span className="product-tag">{product.tag}</span>}<button className="reserve-overlay" onClick={() => reserve(product.name)}>Falar sobre a peça <ArrowUpRight size={15} /></button></div><div className="product-meta"><div><h3>{product.name}</h3><p>{product.desc}</p></div><strong className="contact-price">Consulte pelo WhatsApp</strong></div><div className="product-links"><small className="credit">Referência visual • catálogo Florizi</small><a href={product.sourceUrl} target="_blank" rel="noreferrer">Ver no Instagram <ArrowUpRight size={12} /></a></div></article>)}</div>
          <div className="catalog-footer"><span>Quer ver mais opções?</span><a href="https://www.instagram.com/useflorizi/" target="_blank" rel="noreferrer">Explore o Instagram <ArrowUpRight size={15} /></a></div>
        </section>

        <section className="story section-pad" id="sobre"><div className="story-image"><img src={imageUrls.people} alt="Atendimento próximo na Florizi" /><span className="story-stamp">+15<br /><small>anos de<br />histórias</small></span></div><div className="story-copy"><p className="eyebrow">mais que uma joalheria</p><h2>O melhor presente<br />é <em>ser lembrado.</em></h2><p>Da Flor de Lis à Florizi, construímos nossa história com um propósito simples: fazer cada encontro se sentir especial.</p><p>Há mais de 15 anos, cuidamos de cada detalhe — da procedência e garantia das nossas peças ao jeito de receber você. Porque acreditamos que escolher uma joia é, antes de tudo, compartilhar um sentimento.</p><div className="value-list"><span><ShieldCheck size={19} /> Procedência e garantia</span><span><Sparkles size={19} /> Personalização de presentes</span><span><MessageCircle size={19} /> Atendimento de verdade</span></div><a className="text-link" href="#contato">Conheça a nossa história <ArrowUpRight size={15} /></a></div></section>

        <section className="testimonial-section"><div className="testimonial-wrap"><div className="testimonial-heading"><p className="eyebrow">quem vive, recomenda</p><h2>Feito para tocar.<br /><em>Lembrado para sempre.</em></h2><a className="text-link" href="#contato">Deixe sua avaliação <ArrowUpRight size={15} /></a></div><div className="testimonial-card"><div className="stars">★★★★★</div><blockquote>“O atendimento da Florizi faz toda diferença. Entrei procurando um presente e saí com uma história linda para contar.”</blockquote><div className="testimonial-author"><span className="author-avatar">M</span><div><strong>Mariana S.</strong><small>Cliente Florizi</small></div></div></div><div className="testimonial-photo"><img src={imageUrls.gift} alt="Detalhe de presente Florizi" /><div className="photo-label">clientes<br /><em>florizi</em> <ArrowUpRight size={16} /></div></div></div></section>

        <section className="visit section-pad" id="visite"><div className="visit-copy"><p className="eyebrow">venha nos encontrar</p><h2>A sua próxima joia<br />começa com um <em>olá.</em></h2><p>Tem coisa que só acontece ao vivo: o brilho no detalhe, o caimento perfeito, a conversa que ajuda a escolher. Vem tomar um café com a gente.</p><div className="address"><MapPin size={20} /><div><strong>Avenida Ruy Barbosa, 140</strong><span>Centro, Euclides da Cunha — BA</span><a href="https://www.google.com/maps/search/?api=1&query=Florizi+Euclides+da+Cunha" target="_blank" rel="noreferrer">Pesquisar no Google Maps <ArrowUpRight size={14} /></a></div></div><div className="hours"><Clock3 size={20} /><div><strong>Horário de funcionamento</strong><span>Seg–Sex · 09:00–18:00 &nbsp;|&nbsp; Sáb · 09:00–13:00</span></div></div></div><div className="map-card"><div className="map-grid"></div><div className="map-pin"><MapPin size={22} fill="currentColor" /></div><div className="map-location"><span>você está convidado</span><strong>Florizi</strong><small>Centro · Euclides da Cunha</small></div><a className="map-button" href="https://www.google.com/maps/search/?api=1&query=Florizi+Euclides+da+Cunha" target="_blank" rel="noreferrer">Abrir no Maps <ArrowUpRight size={15} /></a></div></section>

        <section className="contact-section section-pad" id="contato"><div className="contact-inner"><div><p className="eyebrow">vamos conversar</p><h2>Tem uma ocasião<br />especial chegando?</h2><p>Conta pra gente. A gente adora ajudar você a encontrar algo que tenha a sua cara.</p></div><form onSubmit={submitForm} className="contact-form"><label>Seu nome<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Como podemos te chamar?" /></label><label>O que você está procurando?<textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Uma aliança, um presente, uma ideia..." rows="2" /></label><button className="button button-light" type="submit">Enviar pelo WhatsApp <ArrowUpRight size={17} /></button>{notice && <div className="form-notice"><Check size={15} /> {notice}</div>}</form></div></section>

        <section className="faq section-pad"><div><p className="eyebrow">dúvidas frequentes</p><h2>Estamos aqui<br />para <em>ajudar.</em></h2></div><div className="faq-list">{['Vocês fazem perfuração de orelha?', 'Como funciona a garantia das peças?', 'Posso reservar e retirar na loja?', 'Quais formas de pagamento vocês aceitam?'].map((question, index) => <div className="faq-item" key={question}><button onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}><span>{question}</span><ChevronDown size={18} className={faqOpen === index ? 'rotate' : ''} /></button>{faqOpen === index && <p>{index === 0 ? 'Sim. A perfuração é feita com todo cuidado e segurança por nossa equipe.' : index === 1 ? 'Todas as peças seguem com garantia e orientações de cuidado no momento da compra.' : index === 2 ? 'Sim. Você pode reservar pelo WhatsApp e retirar hoje mesmo, conforme disponibilidade.' : 'Aceitamos Pix, cartões e outras formas de pagamento na loja.'}</p>}</div>)}</div></section>
      </main>

      <footer className="footer"><div className="footer-top"><a href="#inicio" className="brand footer-brand"><img className="logo-symbol" src="/FLORIZI/florizi-logo.png" alt="" /><span>florizi</span></a><p>Joias que guardam histórias.<br />Feitas para a sua.</p><div className="footer-socials"><a href="https://www.instagram.com/useflorizi/" target="_blank" rel="noreferrer"><Camera size={18} /></a><a href="https://www.tiktok.com/@useflorizi" target="_blank" rel="noreferrer"><span className="social-letter">♪</span></a><a href="https://www.facebook.com/flordelis.variedades.7" target="_blank" rel="noreferrer"><span className="social-letter">f</span></a></div></div><div className="footer-bottom"><span>© 2025 Florizi. Todos os direitos reservados.</span><span>Feito com cuidado em Euclides da Cunha, BA</span><span className="developer-credit">Desenvolvido por Angelo Marques de Oliveira</span><a href="#inicio">Voltar ao topo ↑</a></div></footer>
      <div className="mobile-actions"><button onClick={() => reserve()}><MessageCircle size={17} /> WhatsApp</button><a href="https://www.google.com/maps/search/?api=1&query=Florizi+Euclides+da+Cunha" target="_blank" rel="noreferrer"><MapPin size={17} /> Como chegar</a></div>
      {selectedProduct && <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}><div className="modal-card" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProduct(null)}><X size={18} /></button><img src={selectedProduct.image} alt={selectedProduct.name} /><div><p className="eyebrow">seleção florizi</p><h3>{selectedProduct.name}</h3><p>{selectedProduct.desc}</p><button className="button button-primary" onClick={() => reserve(selectedProduct.name)}>Reservar via WhatsApp <ArrowUpRight size={16} /></button></div></div></div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);







