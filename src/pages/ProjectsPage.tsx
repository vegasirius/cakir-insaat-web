import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoHorizontal from '../assets/cakirimg/logo.png';
import { projects } from '../data/projects';
import type { Project } from '../types/project';
import { ProjectModal } from '../components/ProjectModal';

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tüm Projeler');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);

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
    <div className="min-h-screen bg-slate-50/80">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Link to="/" className="inline-flex items-center gap-3 text-slate-700 hover:text-slate-900">
            <ArrowLeft size={18} />
            Ana sayfaya dön
          </Link>
          <img src={logoHorizontal} alt="Çakır İnşaat" className="h-9 w-auto" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Portföy</p>
            <h1 className="font-serif text-4xl font-semibold text-slate-900 md:text-5xl">Tüm Projelerimiz</h1>
          </div>
          <p className="max-w-sm text-sm text-slate-500">
            Kartlara tıklayarak proje detaylarını, galeri görsellerini ve teknik bilgileri açabilirsiniz.
          </p>
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
            <div key={project.id} className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-md ring-1 ring-slate-200">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <button
                onClick={() => openProjectModal(project)}
                className="absolute inset-0 z-10"
                aria-label={`${project.title} detayını aç`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
              <div className="pointer-events-none absolute bottom-0 left-0 w-full p-6 translate-y-1 transition-transform duration-300 md:translate-y-4 md:group-hover:translate-y-0">
                <span className="mb-2 inline-flex items-center rounded-full bg-amber-500/90 px-2.5 py-1 text-xs font-extrabold uppercase text-slate-900">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-1 text-sm text-slate-200/90">{project.location} · {project.year}</p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-300">
                  Detayları İncele <ArrowRight size={14} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

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

export default ProjectsPage;
