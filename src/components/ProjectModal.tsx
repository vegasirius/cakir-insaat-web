import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Project } from '../types/project';

type ProjectModalProps = {
  selectedProject: Project | null;
  activeGalleryImage: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectImage: (index: number) => void;
};

export const ProjectModal = ({
  selectedProject,
  activeGalleryImage,
  onClose,
  onNext,
  onPrev,
  onSelectImage,
}: ProjectModalProps) => {
  if (!selectedProject) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-slate-950/80 backdrop-blur-sm p-4 md:p-8" role="dialog" aria-modal="true" aria-label="Proje detay penceresi">
      <div className="mx-auto h-full max-w-6xl rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 md:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-amber-600">{selectedProject.category}</p>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">{selectedProject.title}</h3>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900" aria-label="Proje detayını kapat">
            <X size={22} />
          </button>
        </div>

        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-0 flex-1 min-h-0">
          <div className="relative bg-slate-950 min-h-[280px] md:min-h-[420px]">
            <img
              src={selectedProject.gallery[activeGalleryImage]}
              alt={`${selectedProject.title} galeri görseli ${activeGalleryImage + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/70 p-2 text-white hover:bg-slate-900"
              aria-label="Önceki görsel"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/70 p-2 text-white hover:bg-slate-900"
              aria-label="Sonraki görsel"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1.5">
              {selectedProject.gallery.map((image, index) => (
                <button
                  key={image}
                  onClick={() => onSelectImage(index)}
                  className={`h-2 w-2 rounded-full ${index === activeGalleryImage ? 'bg-amber-400' : 'bg-white/50 hover:bg-white/80'}`}
                  aria-label={`Galeri görseli ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="overflow-y-auto px-5 py-5 md:px-7 md:py-6">
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">{selectedProject.location}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">{selectedProject.year}</span>
            </div>

            <p className="text-slate-700 leading-relaxed">{selectedProject.description}</p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {selectedProject.stats.map((item) => (
                <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                  <p className="text-xs font-semibold text-slate-500">{item.label}</p>
                  <p className="mt-1 text-sm font-bold text-slate-800">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-1 text-sm text-slate-600">
              <p><span className="font-bold text-slate-800">İşveren:</span> {selectedProject.client}</p>
              <p><span className="font-bold text-slate-800">Toplam Alan:</span> {selectedProject.area}</p>
              <p><span className="font-bold text-slate-800">Teslim:</span> {selectedProject.delivery}</p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {selectedProject.gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  className={`overflow-hidden rounded-lg ring-2 transition-all ${index === activeGalleryImage ? 'ring-amber-500' : 'ring-transparent hover:ring-slate-300'}`}
                  onClick={() => onSelectImage(index)}
                  aria-label={`Küçük görsel ${index + 1}`}
                >
                  <img src={image} alt={`${selectedProject.title} küçük görsel ${index + 1}`} className="h-20 w-full object-cover" />
                </button>
              ))}
            </div>

            <a href="#contact" onClick={onClose} className="mt-8 inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800">
              Benzer Proje Teklifi Al
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
