import { products } from '@prisma/client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const TAKE = 9
export default function Products() {
  const [skip, setSkip] = useState(0)
  const [products, setProducts] = useState<products[]>([])

  useEffect(() => {
    fetch(`/api/get-products?skip=0&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
  }, [])
  return (
    <div className="flex flex-col gap-1">
      {products &&
        products.map((item) => (
          <div key={item.id} className="flex items-end">
            <Image
              alt={item.name}
              src={item.image_url ?? ''}
              width={300}
              height={200}
            />
            <span>{item.name}</span>
          </div>
        ))}
    </div>
  )
}
