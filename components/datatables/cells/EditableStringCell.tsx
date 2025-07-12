"use client"

import React from "react"

type Props = {
  rowId: number
  value: string
  isEditing: boolean
  setEditingItemId: (id: number | null) => void
  onUpdateValue: (id: number, newValue: string) => void
}

export function EditableStringCell({
  rowId,
  value,
  isEditing,
  setEditingItemId,
  onUpdateValue,
}: Props) {
  const [tempValue, setTempValue] = React.useState(value)

  React.useEffect(() => {
    setTempValue(value)
  }, [value])

  const handleBlur = () => {
    setEditingItemId(null)
    if (tempValue !== value) {
      onUpdateValue(rowId, tempValue)
    }
  }

  return (
    <div className="w-full" onDoubleClick={() => setEditingItemId(rowId)}>
      {isEditing ? (
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
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
        <span className="cursor-pointer select-none">{value}</span>
      )}
    </div>
  )
}
