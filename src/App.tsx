import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  Phone,
  MapPin,
  Hammer,
  HardHat,
  Ruler,
  ArrowRight,
  Globe,
} from 'lucide-react';
import logoHorizontal from './assets/cakirimg/logo.png';
import heroSlogan from './assets/cakirimg/3.png';
import heroGradient from './assets/cakirimg/3.png';
import servicesHeader from './assets/cakirimg/5.png';
import contactHeader from './assets/cakirimg/6.png';
import projectsHeader from './assets/cakirimg/7.png';
import { ProjectModal } from './components/ProjectModal';
import { projects } from './data/projects';
import { sendContactMessage } from './services/contact';
import type { Project } from './types/project';

type Service = {
  title: string;
  desc: string;
  icon: ReactNode;
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Tüm Projeler');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    subject: 'Konut Projeleri Hakkında',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Anasayfa', href: '#home' },
    { name: 'Hakkımızda', href: '#about' },
    { name: 'Hizmetler', href: '#services' },
    { name: 'Projeler', href: '#projects' },
    { name: 'İletişim', href: '#contact' },
  ];

  const services: Service[] = [
    {
      title: 'Konut İnşaatı',
      desc: 'Hayalinizdeki evi modern mimari ve güvenli yapılarla gerçeğe dönüştürüyoruz.',
      icon: <HardHat className="h-10 w-10 text-amber-500" />,
    },
    {
      title: 'Ticari Projeler',
      desc: 'İş dünyasına değer katan ofis, plaza ve AVM projeleri üretiyoruz.',
      icon: <Ruler className="h-10 w-10 text-amber-500" />,
    },
    {
      title: 'Restorasyon',
      desc: 'Tarihi yapıları aslına uygun şekilde yeniliyor ve güçlendiriyoruz.',
      icon: <Hammer className="h-10 w-10 text-amber-500" />,
    },
  ];

  const aboutHighlights = [
    'Anahtar teslim konut projeleri',
    'Kaliteli malzeme ve işçilik standardı',
    'Şeffaf süreç ve düzenli bilgilendirme',
  ];

  const contactInfo = {
    address: ['Demirkapı Mahallesi, Osmanoğlu Caddesi No:52', 'İstanbul / Bağcılar'],
    phones: ['05367993622'],
  };

  const projectCategories = useMemo(
    () => ['Tüm Projeler', ...Array.from(new Set(projects.map((project) => project.category)))],
    [],
  );

  const filteredProjects = useMemo(
    () =>
      activeCategory === 'Tüm Projeler'
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setActiveGalleryImage(0);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setActiveGalleryImage(0);
  };

  const showNextGalleryImage = () => {
    if (!selectedProject) return;
    setActiveGalleryImage((prev) => (prev + 1) % selectedProject.gallery.length);
  };

  const showPreviousGalleryImage = () => {
    if (!selectedProject) return;
    setActiveGalleryImage((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: 'idle', message: '' });

    try {
      await sendContactMessage(formData);
      setSubmitStatus({
        type: 'success',
        message: 'Mesajınız alındı. Ekibimiz en kısa sürede sizinle iletişime geçecek.',
      });
      setFormData({
        fullName: '',
        phone: '',
        subject: 'Konut Projeleri Hakkında',
        message: '',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '';
      const activationHint = errorMessage.toLowerCase().includes('activation')
        ? 'Form henüz aktif değil. Lütfen FormSubmit tarafından gelen aktivasyon e-postasındaki bağlantıya tıklayın.'
        : '';

      setSubmitStatus({
        type: 'error',
        message:
          activationHint ||
          errorMessage ||
          'Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin veya telefonla ulaşın.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!selectedProject) {
      document.body.style.overflow = '';
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeProjectModal();
      if (event.key === 'ArrowRight') showNextGalleryImage();
      if (event.key === 'ArrowLeft') showPreviousGalleryImage();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <div className="font-sans text-slate-800 selection:bg-amber-500 selection:text-white">
      <nav
        className={`fixed z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/10 bg-slate-950/85 py-2 shadow-xl backdrop-blur-md'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6">
          <a href="#" className="rounded-md bg-white/90 p-1.5 shadow-lg shadow-slate-950/35">
            <img src={logoHorizontal} alt="Çakır İnşaat" className="h-8 w-auto md:h-9" />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wide text-slate-300 transition-colors hover:text-amber-500"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-md bg-amber-500 px-5 py-2 text-sm font-bold text-slate-900 shadow-lg shadow-amber-900/35 transition-colors hover:bg-amber-400"
            >
              Teklif Al
            </a>
          </div>

          <button
            className="text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menüyü aç veya kapat"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute w-full border-t border-slate-800 bg-slate-900 md:hidden">
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b border-slate-800 pb-2 font-medium text-slate-300 hover:text-amber-500"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative flex min-h-[88vh] items-start justify-center overflow-hidden pb-12 pt-28 md:min-h-screen md:items-center md:pb-0 md:pt-0">
        <div className="absolute inset-0 z-0">
          <img src={heroGradient} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/72"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,119,6,.28),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(148,163,184,.18),transparent_30%)]"></div>
        </div>

        <div className="container relative z-10 mx-auto max-w-6xl px-4 text-center md:text-left">
          <div className="mb-6 hidden rounded-lg bg-white/90 p-2 shadow-xl shadow-slate-950/35 md:inline-flex">
            <img src={logoHorizontal} alt="Çakır İnşaat Logo" className="h-12 w-auto md:h-16" />
          </div>
          <span className="animate-fade-in-up mb-5 inline-block rounded-full border border-amber-400/50 bg-amber-500/20 px-3.5 py-1.5 text-xs font-bold tracking-widest text-amber-300 md:text-sm">
            1995'TEN BERİ GÜVENLE
          </span>
          <div className="mb-5">
            <img src={heroSlogan} alt="Güvenli Yapılar Zamanında Teslim" className="mx-auto h-16 w-auto md:mx-0 md:h-24" />
          </div>
          <h1 className="mb-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.02] text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
            Geleceği Sağlam Temeller Üzerine <span className="text-amber-500">İnşa Ediyoruz</span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-200">
            Çakır İnşaat olarak, modern mimariyi geleneksel sağlamlıkla birleştiriyor, aileniz ve işiniz için güvenli yaşam alanları tasarlıyoruz.
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <Link
              to="/projeler"
              className="flex items-center justify-center gap-2 rounded-md bg-amber-500 px-8 py-4 font-bold text-slate-900 shadow-lg shadow-amber-900/40 transition-all hover:-translate-y-1 hover:bg-amber-400"
            >
              Projelerimizi İnceleyin <ArrowRight size={20} />
            </Link>
            <a
              href="#contact"
              className="flex items-center justify-center rounded-md border-2 border-white/80 bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-white hover:text-slate-900"
            >
              Bize Ulaşın
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200">
              <img src="/uploads/projects/giris.jpg" alt="Çakır İnşaat Hakkımızda" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Hakkımızda</p>
              <h2 className="mb-4 font-serif text-4xl font-semibold text-slate-900 md:text-5xl">Güven Veren Konut Projeleri Üretiyoruz</h2>
              <p className="mb-6 leading-relaxed text-slate-600">
                Çakır İnşaat olarak, yaşam kalitesini artıran modern konut projeleri geliştiriyoruz. Proje geliştirmeden teslim aşamasına kadar tüm süreci planlı, şeffaf ve kalite odaklı şekilde yönetiyoruz.
              </p>
              <ul className="mb-7 space-y-2">
                {aboutHighlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-700">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-500">Adres</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">{contactInfo.address[1]}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-500">Telefon</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">{contactInfo.phones[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-slate-50/80 py-20 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <img src={servicesHeader} alt="Hizmetlerimiz" className="mx-auto mb-4 h-14 w-auto rounded-md shadow-md md:h-16" />
            <h2 className="mb-4 font-serif text-4xl font-semibold text-slate-900 md:text-5xl">Size Nasıl Yardımcı Olabiliriz?</h2>
            <p className="text-slate-600">Projenizin her aşamasında profesyonel ekibimizle yanınızdayız.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="group rounded-xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
              >
                <div className="mb-6 inline-block rounded-full bg-slate-50 p-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-amber-50">
                  {service.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="mb-6 leading-relaxed text-slate-600">{service.desc}</p>
                <a href="#contact" className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-amber-600">
                  Detaylı Bilgi <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
            <div>
              <img src={projectsHeader} alt="Projelerimiz" className="mb-4 h-14 w-auto rounded-md shadow-md md:h-16" />
              <h2 className="font-serif text-4xl font-semibold text-slate-900 md:text-5xl">Son Çalışmalarımız</h2>
            </div>
            <Link
              to="/projeler"
              className="rounded border border-slate-200 px-6 py-3 font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Tüm Projeleri Gör
            </Link>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === category
                    ? 'border-amber-500 bg-amber-500 text-slate-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:text-amber-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl shadow-md ring-1 ring-slate-200">
                <img
                  src={project.image}
                  alt="Konut projesi görseli"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100"></div>
                <button
                  onClick={() => openProjectModal(project)}
                  className="absolute inset-0 z-10"
                  aria-label="Proje detayını incele"
                />
                <div className="pointer-events-none absolute bottom-0 left-0 w-full translate-y-2 p-6 transition-transform duration-300 md:translate-y-4 md:group-hover:translate-y-0">
                  <span className="mb-2 inline-flex items-center rounded-full bg-amber-500/90 px-2.5 py-1 text-xs font-extrabold uppercase text-slate-900">
                    {project.category}
                  </span>
                  <p className="text-sm font-semibold text-white/90">Konut Projesi</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-slate-50/85 py-20 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <img src={contactHeader} alt="İletişim" className="mb-4 h-14 w-auto rounded-md shadow-md md:h-16" />
              <h2 className="mb-6 font-serif text-4xl font-semibold text-slate-900 md:text-5xl">Bize Ulaşın</h2>
              <p className="mb-8 text-slate-600">
                Projeleriniz hakkında detaylı bilgi almak veya ofisimizi ziyaret etmek için aşağıdaki bilgilerden bize ulaşabilirsiniz.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-white text-amber-500 shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-slate-900">Adres</h3>
                    <p className="text-slate-600">{contactInfo.address[0]}<br />{contactInfo.address[1]}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-white text-amber-500 shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-slate-900">Telefon</h3>
                    {contactInfo.phones.map((phone) => (
                      <p key={phone} className="text-slate-600">{phone}</p>
                    ))}
                  </div>
                </div>

              </div>

              <div className="mt-10">
                <h4 className="mb-4 font-bold text-slate-900">Bizi Takip Edin</h4>
                <div className="flex gap-4">
                  {[Globe, Phone, MapPin].map((Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded bg-slate-200 text-slate-600 transition-colors hover:bg-amber-500 hover:text-white"
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-lg ring-1 ring-slate-100">
              <h3 className="mb-6 text-2xl font-bold text-slate-900">Mesaj Gönderin</h3>
              <form onSubmit={handleContactSubmit}>
                <div className="mb-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Adınız Soyadınız</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      type="text"
                      className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-3 transition-colors focus:border-amber-500 focus:outline-none"
                      placeholder="Ahmet Yılmaz"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Telefon</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      type="tel"
                      className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-3 transition-colors focus:border-amber-500 focus:outline-none"
                      placeholder="05XX XXX XX XX"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-slate-700">Konu</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-3 transition-colors focus:border-amber-500 focus:outline-none"
                    disabled={isSubmitting}
                  >
                    <option>Konut Projeleri Hakkında</option>
                    <option>Kentsel Dönüşüm</option>
                    <option>İş Başvurusu</option>
                    <option>Diğer</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="mb-1 block text-sm font-medium text-slate-700">Mesajınız</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={4}
                    className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-3 transition-colors focus:border-amber-500 focus:outline-none"
                    placeholder="Mesajınızı buraya yazınız..."
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                {submitStatus.type !== 'idle' && (
                  <div
                    className={`mb-4 rounded-md px-4 py-3 text-sm font-medium ${
                      submitStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded bg-slate-900 py-4 font-bold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'} <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8 grid gap-8 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <a href="#" className="mb-4 inline-flex rounded-md bg-white/90 p-1.5">
                <img src={logoHorizontal} alt="Çakır İnşaat" className="h-10 w-auto" />
              </a>
              <p className="mb-6 max-w-sm">
                İnşaat sektöründe güven ve kalitenin adresi. Modern yaşam alanları ve ticari yapılarla geleceği inşa ediyoruz.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-bold text-white">Hızlı Erişim</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="transition-colors hover:text-amber-500">
                    Anasayfa
                  </a>
                </li>
                <li>
                  <a href="#about" className="transition-colors hover:text-amber-500">
                    Hakkımızda
                  </a>
                </li>
                <li>
                  <a href="#services" className="transition-colors hover:text-amber-500">
                    Hizmetler
                  </a>
                </li>
                <li>
                  <a href="#projects" className="transition-colors hover:text-amber-500">
                    Projeler
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold text-white">Hizmetlerimiz</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="transition-colors hover:text-amber-500">
                    Konut Projeleri
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-amber-500">
                    Ticari Yapılar
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-amber-500">
                    Restorasyon
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-amber-500">
                    Müteahhitlik
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between border-t border-slate-800 pt-8 text-center text-sm md:flex-row md:text-left">
            <p>&copy; 2026 Çakır İnşaat. Tüm hakları saklıdır.</p>
            <div className="mt-4 flex gap-4 md:mt-0">
              <a href="#" className="transition-colors hover:text-white">
                Gizlilik Politikası
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Kullanım Şartları
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ProjectModal
        selectedProject={selectedProject}
        activeGalleryImage={activeGalleryImage}
        onClose={closeProjectModal}
        onNext={showNextGalleryImage}
        onPrev={showPreviousGalleryImage}
        onSelectImage={setActiveGalleryImage}
      />
    </div>
  );
};

export default App;
