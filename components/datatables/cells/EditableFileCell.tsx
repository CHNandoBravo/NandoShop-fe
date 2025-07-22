"use client"

import React from "react"

type Props = {
  rowId: number
  imageUrl: string
  isEditing: boolean
  setEditingItemId: (id: number | null) => void
  onUpdateFile: (id: number, file: File) => void
}

export function EditableFileCell({
  rowId,
  imageUrl,
  isEditing,
  setEditingItemId,
  onUpdateFile,
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpdateFile(rowId, file)
      setEditingItemId(null)
    }
  }

  const handleDoubleClick = () => {
    setEditingItemId(rowId)
    // Esperar al próximo ciclo de render para asegurarse de que el input esté visible
    setTimeout(() => {
      inputRef.current?.click()
    }, 0)
  }

  return (
    <div
      className="flex items-center gap-2"
      onDoubleClick={handleDoubleClick}
    >
      <img
        src={imageUrl}
        alt="Imagen"
        className="h-10 w-10 rounded object-cover border"
      />
      {isEditing && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm hidden"
        />
      )}
    </div>
  )
}
