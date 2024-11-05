import { useEffect, useState } from 'react'
import productAPI from '../../api/product'
import { Product } from '../../interfaces/product.interfaces'

export const ProductComponent = () => {
  const [product, setProduct] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productAPI.getProduct()
        setProduct(products) // Set the product state with fetched data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, []) // Empty dependency array to run the effect only once

  console.log('produict', product);

  return (
    <>
      <div>Product</div>
      <div>
        {product.length > 0
          ? product.map((item, index) => <div key={index}>{item.name}</div>)
          : 'No products available'}
      </div>
    </>
  )
}
