"use client"

import React from "react"

type Props = {
  rowId: number
  stock: number
  isEditing: boolean
  setEditingStockId: (id: number | null) => void
  onUpdateStock: (id: number, newStock: number) => void
}

export function EditableStockCell({
  rowId,
  stock,
  isEditing,
  setEditingStockId,
  onUpdateStock,
}: Props) {
  const [tempStock, setTempStock] = React.useState(stock)

  React.useEffect(() => {
    setTempStock(stock)
  }, [stock])

  const handleBlur = () => {
    setEditingStockId(null)
    if (tempStock !== stock) {
      onUpdateStock(rowId, tempStock)
    }
  }

  return (
    <div
      className="w-24"
      onDoubleClick={() => setEditingStockId(rowId)}
    >
      {isEditing ? (
        <input
          type="number"
          value={tempStock}
          onChange={(e) => setTempStock(Number(e.target.value))}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") {
              (e.target as HTMLInputElement).blur()
            }
          }}
          className="w-full rounded-md border px-2 py-1 text-sm outline-none"
          autoFocus
        />
      ) : (
        <span className="cursor-pointer select-none">{stock}</span>
      )}
    </div>
  )
}
