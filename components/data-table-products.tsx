"use client"

import * as React from "react"
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  EllipsisVertical,
  Trash,
} from "lucide-react"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator } from "./ui/dropdown-menu"
import { DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Tooltip } from "@radix-ui/react-tooltip"
import { TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { deleteProduct, updateNameProduct, updatePriceProduct, updateStockProduct } from "@/api/auth/products"
import { EditableNumberCell } from "./datatables/cells/EditableStockCell"
import { EditableStringCell } from "./datatables/cells/EditableStringCell"

export const schema = z.object({
  id: z.number(),
  description: z.string(),
  name: z.string(),
  image: z.string(),
  category: z.string(),
  price: z.number(),
  stock: z.number(),
})



export function getColumns({
  handleDelete,
  editingStockId,
  setEditingStockId,
  handleUpdateStock,
  editingPriceId,
  setEditingPriceId,
  handleUpdatePrice,
  editingNameId,
  setEditingNameId,
  handleUpdateName
}: {
  handleDelete: (id: number) => void
  editingStockId: number | null
  setEditingStockId: (id: number | null) => void
  handleUpdateStock: (id: number, newStock: number) => void
  editingPriceId: number | null
  setEditingPriceId: (id: number | null) => void
  handleUpdatePrice: (id: number, newPrice: number) => void,
  editingNameId: number | null
  setEditingNameId: (id: number | null) => void
  handleUpdateName: (id: number, newName: string) => void
}): ColumnDef<z.infer<typeof schema>>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => (
        <>
         <EditableStringCell
            rowId={row.original.id}
            value={row.original.name}
            isEditing={editingNameId === row.original.id}
            setEditingItemId={setEditingNameId}
            onUpdateValue={handleUpdateName}
            />
        </>
      ),
    },
    {
      accessorKey: "image",
      header: "Imagen",
      cell: ({ row }) => (
        <div className="w-20">
         <img src={row.original.image} alt="" />
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Categoría",
      cell: ({ row }) => (
        <div className="w-32">
          <Badge variant="outline" className="px-1.5 text-muted-foreground">
            {row.original.category}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Precio",
      cell: ({ row }) => (
        <EditableNumberCell
          rowId={row.original.id}
          stock={row.original.price}
          isEditing={editingPriceId === row.original.id}
          setEditingItemId={setEditingPriceId}
          onUpdateNumber={handleUpdatePrice}
        />
      ),
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => (
        <EditableNumberCell
          rowId={row.original.id}
          stock={row.original.stock}
          isEditing={editingStockId === row.original.id}
          setEditingItemId={setEditingStockId}
          onUpdateNumber={handleUpdateStock}
        />
      ),
    },
    {
      id: "delete",
      cell: ({row}) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge onClick={() => handleDelete(row.original.id)} variant="outline" className="px-1.5 text-muted-foreground cursor-pointer">
              <Trash width={15}/>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eliminar</p>
          </TooltipContent>
        </Tooltip>
        
      ),},
  ]
};

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function DataTableProducts({
  data: initialData,
}: {
  data: z.infer<typeof schema>[]
}) {
  const [data, setData] = React.useState(initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )
  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )

  const [editingStockId, setEditingStockId] = React.useState<number | null>(null)
  const [editingPriceId, setEditingPriceId] = React.useState<number | null>(null)
  const [editingNameId, setEditingNameId] = React.useState<number | null>(null)
  const handleUpdateStock = (id: number, newStock: number) => {
    setData(prev =>
      prev.map(product =>
        product.id === id ? { ...product, stock: newStock } : product
      )
    )
    updateStockProduct(id, {newStock});
  }

  const handleUpdatePrice = (id: number, newPrice: number) => {
    setData(prev =>
      prev.map(product =>
        product.id === id ? { ...product, price: newPrice } : product
      )
    )
    updatePriceProduct(id, {newPrice});
  }

  const handleUpdateName = (id: number, newName: string) => {
    setData(prev =>
      prev.map(product =>
        product.id === id ? { ...product, name: newName } : product
      )
    )
    updateNameProduct(id, {newName});
  }

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteProduct(id);
      setData((prev) => prev.filter((p) => p.id !== id)); // 🔥 ACTUALIZA EL DOM
      console.log("Producto eliminado:", res);
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };
  const columns = getColumns({
    handleDelete,
    editingStockId,
    setEditingStockId,
    handleUpdateStock,
    editingPriceId,
    setEditingPriceId,
    handleUpdatePrice,
    editingNameId,
    setEditingNameId,
    handleUpdateName
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }
  return (
    <Tabs
      defaultValue="outline"
      className="flex w-full flex-col justify-start "
    >
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Filas por pagina
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Pagina {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}