import { useCallback, useEffect, useRef, useState } from "react"
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore"
import { db } from "../firebase"
import type { Product } from "../types"
import { normalizeCategoryValue } from "../utils/categoryUtils"

const PRODUCTS_PAGE_SIZE = 12

export type ProductPriceRange = "all" | "99-599" | "599-1199" | "1199-1799"

const getPriceBounds = (priceRange: ProductPriceRange) => {
  switch (priceRange) {
    case "99-599":
      return { min: 99, max: 599 }
    case "599-1199":
      return { min: 599, max: 1199 }
    case "1199-1799":
      return { min: 1199, max: 1799 }
    default:
      return null
  }
}

const mapProduct = (doc: QueryDocumentSnapshot<DocumentData>): Product | null => {
  const data = doc.data()

  const product = {
    id: doc.id,
    name: data.name || "Untitled Product",
    category: normalizeCategoryValue(data.category || "babyset"),
    price: Number(data.price) || 0,
    rating: Number(data.rating) || 0,
    ratingCount: Number(data.ratingCount) || 0,
    image: data.image || data.images?.[0] || "",
    images: data.images || [],
    description: data.description || "",
    includes: data.includes || [],
    tags: data.tags || [],
    isNew: Boolean(data.isNew),
    sizes: data.sizes || [],
    colors: data.colors || [],
    expectedDispatchDays: Number(data.expectedDispatchDays) || undefined,
    expectedDeliveryDays: Number(data.expectedDeliveryDays) || undefined,
    stock: Number(data.stock) || 0,
    status: data.status || "Draft",
    customizable: Boolean(data.customizable),
    sold: Number(data.sold) || 0,
  } as Product

  return product.status?.toLowerCase() === "active" ? product : null
}

export function useUserProducts(priceRange: ProductPriceRange = "all") {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingPage, setLoadingPage] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const pageCursorsRef = useRef<Record<number, QueryDocumentSnapshot<DocumentData> | null>>({ 1: null })
  const pageCacheRef = useRef<Record<number, Product[]>>({})
  const loadingPageRef = useRef(false)

  const getPage = useCallback(
    async (pageNumber: number, cursor: QueryDocumentSnapshot<DocumentData> | null) => {
      const productsRef = collection(db, "products")
      const priceBounds = getPriceBounds(priceRange)
      const constraints = [
        ...(priceBounds
          ? [
              where("price", ">=", priceBounds.min),
              where("price", "<=", priceBounds.max),
              orderBy("price", "asc"),
            ]
          : [orderBy("createdAt", "desc")]),
        ...(cursor ? [startAfter(cursor)] : []),
        limit(PRODUCTS_PAGE_SIZE),
      ]
      const snapshot = await getDocs(query(productsRef, ...constraints))
      const lastDocument = snapshot.docs.at(-1) || null

      pageCursorsRef.current[pageNumber + 1] = lastDocument
      pageCacheRef.current[pageNumber] = snapshot.docs
        .map(mapProduct)
        .filter((product): product is Product => product !== null)
      return lastDocument
    },
    [],
  )

  useEffect(() => {
    let cancelled = false
    const productsRef = collection(db, "products")
    const priceBounds = getPriceBounds(priceRange)
    const productsCountQuery = query(
      productsRef,
      ...(priceBounds
        ? [where("price", ">=", priceBounds.min), where("price", "<=", priceBounds.max)]
        : []),
    )
    const firstPageQuery = query(
      productsRef,
      ...(priceBounds
        ? [
            where("price", ">=", priceBounds.min),
            where("price", "<=", priceBounds.max),
            orderBy("price", "asc"),
          ]
        : [orderBy("createdAt", "desc")]),
      limit(PRODUCTS_PAGE_SIZE),
    )

    setLoading(true)
    setError(null)
    setCurrentPage(1)
    pageCursorsRef.current = { 1: null }
    pageCacheRef.current = {}

    Promise.all([getCountFromServer(productsCountQuery), getDocs(firstPageQuery)])
      .then(([countSnapshot, snapshot]) => {
        if (cancelled) return
        const count = countSnapshot.data().count
        setTotalPages(Math.max(1, Math.ceil(count / PRODUCTS_PAGE_SIZE)))
        pageCursorsRef.current[2] = snapshot.docs.at(-1) || null
        pageCacheRef.current[1] = snapshot.docs
          .map(mapProduct)
          .filter((product): product is Product => product !== null)
        setProducts(pageCacheRef.current[1])
        setLoading(false)
      })
      .catch((fetchError: Error) => {
        if (cancelled) return
        console.error("Firestore Error:", fetchError)
        setError(fetchError.message)
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [priceRange])

  const goToPage = useCallback(async (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage || loadingPageRef.current) return

    const cachedProducts = pageCacheRef.current[pageNumber]
    if (cachedProducts) {
      setProducts(cachedProducts)
      setCurrentPage(pageNumber)
      return
    }

    loadingPageRef.current = true
    setLoadingPage(true)
    setError(null)

    try {
      let cursorPage = pageNumber
      while (cursorPage > 1 && pageCursorsRef.current[cursorPage] === undefined) cursorPage -= 1

      let cursor = pageCursorsRef.current[cursorPage] || null
      for (let page = cursorPage; page <= pageNumber; page += 1) {
        if (pageCacheRef.current[page]) {
          cursor = pageCursorsRef.current[page + 1] || cursor
          continue
        }
        cursor = await getPage(page, cursor)
      }

      setProducts(pageCacheRef.current[pageNumber] || [])
      setCurrentPage(pageNumber)
    } catch (fetchError) {
      console.error("Failed to load product page:", fetchError)
      setError(fetchError instanceof Error ? fetchError.message : "Failed to load product page")
    } finally {
      loadingPageRef.current = false
      setLoadingPage(false)
    }
  }, [currentPage, getPage, totalPages])

  return {
    products,
    loading,
    loadingPage,
    currentPage,
    totalPages,
    goToPage,
    error,
  }
}
