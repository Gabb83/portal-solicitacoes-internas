"use client";

import { TriangleAlert } from "lucide-react";

interface ModalConfirmaçãoDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalConfirmaçãoDelete({
  isOpen, onClose, onConfirm
} : ModalConfirmaçãoDeleteProps) {
  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 transition-opacity">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
            <TriangleAlert className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Atenção</h2>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Você está prestes a excluir a solicitação. Tem certeza que deseja fazer isso?
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors cursor-pointer shadow-sm"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}