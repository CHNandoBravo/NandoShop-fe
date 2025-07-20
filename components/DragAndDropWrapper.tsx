import { useState, useRef } from "react";

type DragAndDropWrapperProps = {
  children: React.ReactNode;
  onFileDrop: (file: File) => void;
};

export function DragAndDropWrapper({ children, onFileDrop }: DragAndDropWrapperProps) {
  const [dragging, setDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    dragCounter.current = 0;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileDrop(file);
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative ${dragging ? "bg-black/70 border-none duration-300 ease-in" : "" }`}
    >
      {dragging && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none py-4 backdrop-blur-md">
          <span className={`text-2xl font-bold ${dragging ? "text-white" : ""}`}>Soltá la imagen aquí 📂</span>
        </div>
      )}
      {children}
    </div>
  );
}
