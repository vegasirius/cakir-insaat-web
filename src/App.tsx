import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Hammer, HardHat, Ruler, ArrowRight, CheckCircle, Globe, ChevronRight } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll takibi için
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

  const projects = [
    { id: 1, title: 'Vadi Konakları', category: 'Konut', image: 'https://images.unsplash.com/photo-1600596542815-e32c0ee32534?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Çakır Plaza', category: 'Ticari', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Sahil Villaları', category: 'Lüks Konut', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Merkez AVM', category: 'Ticari', image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Orman Evleri', category: 'Konut', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Sanayi Kompleksi', category: 'Endüstriyel', image: 'https://images.unsplash.com/photo-1581094794329-cdac82aadbcc?auto=format&fit=crop&q=80&w=800' },
  ];

  const services = [
    { title: 'Konut İnşaatı', desc: 'Hayalinizdeki evi modern mimari ve güvenli yapılarla gerçeğe dönüştürüyoruz.', icon: <HardHat className="w-10 h-10 text-amber-500" /> },
    { title: 'Ticari Projeler', desc: 'İş dünyasına değer katan ofis, plaza ve AVM projeleri üretiyoruz.', icon: <Ruler className="w-10 h-10 text-amber-500" /> },
    { title: 'Restorasyon', desc: 'Tarihi yapıları aslına uygun şekilde yeniliyor ve güçlendiriyoruz.', icon: <Hammer className="w-10 h-10 text-amber-500" /> },
  ];

  return (
    <div className="font-sans text-slate-800 bg-white selection:bg-amber-500 selection:text-white">
      
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900 shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-white tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 flex items-center justify-center rounded text-slate-900 font-black">Ç</div>
            ÇAKIR İNŞAAT
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-amber-500 transition-colors uppercase tracking-wide">
                {link.name}
              </a>
            ))}
            <a href="#contact" className="px-5 py-2 bg-amber-500 text-slate-900 font-bold text-sm rounded hover:bg-amber-400 transition-colors">
              Teklif Al
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 absolute w-full">
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-300 hover:text-amber-500 font-medium border-b border-slate-800 pb-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541976544337-1f99297df8c2?auto=format&fit=crop&q=80&w=2000" 
            alt="Construction Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <span className="inline-block py-1 px-3 rounded bg-amber-500/20 text-amber-400 border border-amber-500/50 text-sm font-bold mb-4 animate-fade-in-up">
            1995'TEN BERİ GÜVENLE
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl">
            Geleceği Sağlam Temeller Üzerine <span className="text-amber-500">İnşa Ediyoruz</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Çakır İnşaat olarak, modern mimariyi geleneksel sağlamlıkla birleştiriyor, aileniz ve işiniz için güvenli yaşam alanları tasarlıyoruz.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <a href="#projects" className="px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded hover:bg-amber-400 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Projelerimizi İnceleyin <ArrowRight size={20} />
            </a>
            <a href="#contact" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center">
              Bize Ulaşın
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-slate-900 py-12 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800/0 md:divide-slate-700">
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">28+</div>
              <div className="text-slate-400 text-sm md:text-base">Yıllık Tecrübe</div>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">150+</div>
              <div className="text-slate-400 text-sm md:text-base">Tamamlanan Proje</div>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">500+</div>
              <div className="text-slate-400 text-sm md:text-base">Mutlu Aile</div>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">50+</div>
              <div className="text-slate-400 text-sm md:text-base">Uzman Personel</div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800" alt="About Us" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-slate-100 rounded-lg -z-0 hidden md:block"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl -z-0"></div>
            </div>
            <div className="lg:w-1/2">
              <h4 className="text-amber-500 font-bold uppercase tracking-wider mb-2">Hakkımızda</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Kalite ve Güvenin Adresi: Çakır İnşaat</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                1995 yılında kurulan Çakır İnşaat, inşaat sektöründe kalite, estetik ve güveni bir araya getirme misyonuyla yola çıkmıştır. Çeyrek asrı aşkın tecrübemizle, şehrin silüetine değer katan projelere imza atıyoruz.
              </p>
              <ul className="space-y-4 mb-8">
                {['Zamanında Teslimat Garantisi', 'Yüksek Kaliteli Malzeme Kullanımı', 'Depreme Dayanıklı Yapılar', 'Satış Sonrası Destek'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="text-amber-500 flex-shrink-0" size={20} />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="text-amber-600 font-bold hover:text-amber-700 flex items-center gap-2 group">
                Devamını Oku <ChevronRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h4 className="text-amber-500 font-bold uppercase tracking-wider mb-2">Hizmetlerimiz</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Size Nasıl Yardımcı Olabiliriz?</h2>
            <p className="text-slate-600">Projenizin her aşamasında profesyonel ekibimizle yanınızdayız.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-shadow border-t-4 border-transparent hover:border-amber-500 group">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 inline-block p-4 rounded-full bg-slate-50 group-hover:bg-amber-50">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.desc}</p>
                <a href="#contact" className="text-sm font-bold text-slate-900 hover:text-amber-600 flex items-center gap-2">
                  Detaylı Bilgi <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Portfolio */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h4 className="text-amber-500 font-bold uppercase tracking-wider mb-2">Projelerimiz</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Son Çalışmalarımız</h2>
            </div>
            <a href="#" className="px-6 py-3 border border-slate-200 rounded hover:bg-slate-50 text-slate-600 font-medium transition-colors">
              Tüm Projeleri Gör
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-amber-400 text-sm font-bold uppercase mb-1 block">{project.category}</span>
                  <h3 className="text-white text-xl font-bold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Hayalinizdeki Projeyi Birlikte İnşa Edelim</h2>
          <p className="text-slate-900/80 text-lg mb-8 max-w-2xl mx-auto">Uzman ekibimizle tanışmak ve ücretsiz keşif hizmetimizden yararlanmak için hemen bizimle iletişime geçin.</p>
          <a href="#contact" className="inline-block px-8 py-4 bg-slate-900 text-white font-bold rounded hover:bg-slate-800 transition-colors shadow-lg">
            Hemen Teklif Alın
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div>
              <h4 className="text-amber-500 font-bold uppercase tracking-wider mb-2">İletişim</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Bize Ulaşın</h2>
              <p className="text-slate-600 mb-8">
                Projeleriniz hakkında detaylı bilgi almak veya ofisimizi ziyaret etmek için aşağıdaki bilgilerden bize ulaşabilirsiniz.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded shadow-sm flex items-center justify-center text-amber-500 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Adres</h3>
                    <p className="text-slate-600">Barbaros Bulvarı, No:123, Kat:4<br/>Beşiktaş, İstanbul</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded shadow-sm flex items-center justify-center text-amber-500 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Telefon</h3>
                    <p className="text-slate-600">+90 (212) 123 45 67</p>
                    <p className="text-slate-600">+90 (532) 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded shadow-sm flex items-center justify-center text-amber-500 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">E-Posta</h3>
                    <p className="text-slate-600">info@cakirinsaat.com.tr</p>
                    <p className="text-slate-600">satis@cakirinsaat.com.tr</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="font-bold text-slate-900 mb-4">Bizi Takip Edin</h4>
                <div className="flex gap-4">
                  {[Globe, Mail, Phone, MapPin].map((Icon, idx) => (
                    <a key={idx} href="#" className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center text-slate-600 hover:bg-amber-500 hover:text-white transition-colors">
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Mesaj Gönderin</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız.'); }}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Adınız Soyadınız</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-amber-500 transition-colors" placeholder="Ahmet Yılmaz" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefon</label>
                    <input type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-amber-500 transition-colors" placeholder="05XX XXX XX XX" required />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">E-Posta Adresi</label>
                  <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-amber-500 transition-colors" placeholder="ornek@email.com" required />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Konu</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-amber-500 transition-colors">
                    <option>Konut Projeleri Hakkında</option>
                    <option>Kentsel Dönüşüm</option>
                    <option>İş Başvurusu</option>
                    <option>Diğer</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mesajınız</label>
                  <textarea rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-amber-500 transition-colors" placeholder="Mesajınızı buraya yazınız..." required></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                  Mesajı Gönder <ArrowRight size={20} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <a href="#" className="text-2xl font-bold text-white tracking-tighter flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-amber-500 flex items-center justify-center rounded text-slate-900 font-black">Ç</div>
                ÇAKIR İNŞAAT
              </a>
              <p className="max-w-sm mb-6">
                İnşaat sektöründe güven ve kalitenin adresi. Modern yaşam alanları ve ticari yapılarla geleceği inşa ediyoruz.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Hızlı Erişim</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-amber-500 transition-colors">Anasayfa</a></li>
                <li><a href="#about" className="hover:text-amber-500 transition-colors">Hakkımızda</a></li>
                <li><a href="#services" className="hover:text-amber-500 transition-colors">Hizmetler</a></li>
                <li><a href="#projects" className="hover:text-amber-500 transition-colors">Projeler</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Hizmetlerimiz</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-500 transition-colors">Konut Projeleri</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Ticari Yapılar</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Restorasyon</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Müteahhitlik</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2024 Çakır İnşaat. Tüm hakları saklıdır.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;