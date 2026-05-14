import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { ExercicioJSON } from "../../types";

interface ExerciseSelectProps {
  exercises: ExercicioJSON[];
  selectedName: string;
  onSelect: (exercise: ExercicioJSON) => void;
}

export default function ExerciseSelect({ exercises, selectedName, onSelect }: ExerciseSelectProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        portalRef.current &&
        !portalRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPortalStyle = (): React.CSSProperties => {
    if (!inputRef.current) return {};
    const rect = inputRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 640;
    const padding = 16;

    if (isMobile) {
      const width = window.innerWidth - padding * 2;
      return {
        position: "fixed",
        top: rect.bottom + 4,
        left: `${padding}px`,
        width: `${width}px`,
        maxHeight: "60vh",
        zIndex: 9999,
      };
    }

    // Desktop
    const minDesktopWidth = 320;
    let width = rect.width;
    if (width < minDesktopWidth) width = minDesktopWidth;

    let left = rect.left;
    // Ajuste para não sair da tela
    if (left + width > window.innerWidth - padding) {
      left = window.innerWidth - width - padding;
    }
    if (left < padding) left = padding;

    return {
      position: "fixed",
      top: rect.bottom + 4,
      left: `${left}px`,
      width: `${width}px`,
      maxHeight: "60vh",
      zIndex: 9999,
    };
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder="Selecione o exercício"
        className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm cursor-pointer"
        value={selectedName}
        readOnly
        onClick={() => setOpen(!open)}
        required
      />
      {open &&
        createPortal(
          <div
            ref={portalRef}
            style={getPortalStyle()}
            className="bg-white border rounded shadow overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {exercises.map((ex) => (
              <div
                key={ex.exerciseId}
                className="flex items-center gap-3 border-b border-gray-200 px-3 py-2 hover:bg-blue-50 cursor-pointer"
                onClick={() => {
                  onSelect(ex);
                  setOpen(false);
                }}
              >
                <img
                  src={ex.gifUrl}
                  alt={ex.nome}
                  className="w-16 h-16 md:w-20 md:h-20 rounded object-cover shrink-0"
                />
                <span className="text-sm md:text-base whitespace-normal wrap-break-word">
                  {ex.nome}
                </span>
              </div>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}