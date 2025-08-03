'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HiMiniSquares2X2, HiMiniXMark } from "react-icons/hi2";
import { IoFunnel } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { ProductsInterfaces } from '@/interfaces/products';
import { allProducts } from '@/api/auth/products';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ProductCard } from '@/components/ui/product-card';
import HeroSidebar from '@/components/hero-sidebar';
import { toast } from 'react-toastify';
import Link from 'next/link';
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'


const filters = [
  {
    id: 'category',
    name: 'Categorias',
    options: [
      { value: 'new-arrivals', label: 'Arte', checked: false },
    ],
  },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
const [page, setPage] = useState(0);
const [loading, setLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);
const [productsData, setProductsData] = useState<ProductsInterfaces.Product[]>([]);
const searchRef = useRef<HTMLDivElement>(null);
const [isSearching, setIsSearching] = useState(false);

const LIMIT = 50;
const observer = useRef<IntersectionObserver | null>(null);
const lastProductRef = useCallback((node: any) => {
  if (loading) return;
  if (observer.current) observer.current.disconnect();

  observer.current = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore) {
      setPage((prev) => prev + 1);
    }
  });

  if (node) observer.current.observe(node);
}, [loading, hasMore]);
const [ searchValue, setSearchValue ] = useState("");
useEffect(() => {
  const loadProducts = async () => {

    if (isSearching) return; 
    
    try {
      setLoading(true);
      let count = 0;
      await allProducts((product) => {
        // console.log(products)
        count++;
        console.log(product)
        setProductsData((prev) => {
          if (prev.find(p => p.id === product.id)) return prev;
          return [...prev, product];
        });
      }, {
        offset: 0,
        limit: LIMIT,
        query: searchValue
      });

      if (count < LIMIT) {
        setHasMore(false); // no hay más productos
      }
    } catch (err) {
      console.error("Error cargando productos:", err);
    } finally {
      setLoading(false);
    }
  };

  loadProducts();

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setActiveSearchList(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };

}, [page, isSearching]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [ activeSearchList, setActiveSearchList ] = useState(false);
  const [ searchList, setSearchList ] = useState<ProductsInterfaces.Product[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // ✅ Cancelar el timeout pendiente del useEffect si existe
  if (searchTimeoutRef.current) {
    clearTimeout(searchTimeoutRef.current);
  }

  setLoading(true);
   // limpiar resultados anteriores
  let results: ProductsInterfaces.Product[] = [];
  setPage(0)
  await allProducts((product) => {
    results.push(product);
  }, {
    offset: 0,
    limit: LIMIT,
    query: searchValue,
  });
  console.log(results)
  setSearchList(results);
  setProductsData([]);
  setPage(0);
  setProductsData(results);
  setHasMore(true);
  setActiveSearchList(false);
  setLoading(false);
};

useEffect(() => {
  // ✅ Limpiar resultados si searchValue está vacío
  if (searchValue === "") {
    setSearchList([]);
    setProductsData([]);
    setIsSearching(false); 
    setSearchList([]);
    return;
  }

  // ✅ Guardar el timeout en una referencia para poder cancelarlo desde handleSearch
  searchTimeoutRef.current = setTimeout(async () => {
    try {
      setLoading(true);
      setSearchList([]);

      let count = 0;
      await allProducts((product) => {
        count++;
        setSearchList((prev) => [...prev, product]);
      }, {
        offset: 0,
        limit: LIMIT,
        query: searchValue,
      });

      setHasMore(count >= 5);
      setActiveSearchList(true);
    } catch (err) {
      console.error("Error cargando productos:", err);
    } finally {
      setLoading(false);
    }
  }, 1000);

  // ✅ Limpiar timeout si cambia el searchValue o se desmonta el componente
  return () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };
}, [searchValue]);



  return (
    <>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <HiMiniXMark aria-hidden="true" className="size-6" />
                </button>
              </div>

              <form className="mt-4 border-t border-gray-200">

                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <>

          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Recién llegados</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                {/* <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div> */}

               
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <HiMiniSquares2X2 aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <IoFunnel />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                

                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <GoPlus aria-hidden="true" className="size-5 group-data-open:hidden" />
                          {/* <AiOutlineMinus aria-hidden="true" className="size-5 group-not-data-open:hidden" /> */}
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

                
              {/* Product grid */}
              <div className="lg:col-span-3">
              
                <form className="w-full mx-auto" onSubmit={e => handleSearch(e)}>   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscá ropa, tecnología, hogar y más"  />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Buscar
                        </button>
                        {
                          activeSearchList?
                            <div className='absolute w-full h-auto bg-white z-[1]' ref={searchRef}>
                              {
                                searchList.map((product:ProductsInterfaces.Product) => (
                                  <Link href='#' className=''>
                                    <div className='w-full h-full p-4 hover:bg-gray-50'>
                                      { product.name }
                                    </div>
                                  </Link>
                                ))
                              }
                              {
                                searchList.length != 0 ? 
                                  <Link href={"#"} className='hover:underline decoration-solid '>
                                    <div className='w-full h-full p-4 '>
                                      Ver más
                                    </div>
                                    
                                  </Link>
                                :
                                <div className='w-full h-full p-4 '>
                                  No se encontraron resultados
                                </div>
                              }
                            </div>
                          :
                          <></>
                        }
                    </div>
                </form>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {productsData.length === 0 ? (
                        <p className="text-center text-gray-500 mt-4">No se encontraron productos.</p>
                      ) : (
                        productsData.map((product, index) => {
                          const isLast = index === productsData.length - 1;
                          return (
                            <div key={index} ref={isLast ? lastProductRef : null}>
                              <ProductCard
                                id={product.id}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                              />
                            </div>
                          );
                        })
                      )}
                </div>                
              </div>
            </div>
          </section>
        </>
        
    </>
  )
}
