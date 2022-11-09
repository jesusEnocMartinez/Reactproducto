
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { prisma } from '../lib/prisma'


  
  interface Product{
    product: {
      id: string
      slug: string
      description: string
      inventery:   string
      price: string
    }[]
  }
  
  interface FormData {
    id: string
      slug: string
      description: string
      inventery:   string
      price: string
  }
  
  const Home = ({product}: Product) => {
    const [form, setForm] = useState<FormData>({slug: '', description: '', inventery: '',price: '',id: ''})
    const router = useRouter()
  
    const refreshData = () => {
      router.replace(router.asPath)
    }
  
    async function create(data: FormData) {
      try {
        fetch('http://localhost:3000/api/create', {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }).then(() => {
          if(data.id) {
            deleteProduct(data.id)
            setForm({slug: '', description: '', inventery: '',price: '',id: ''})
            refreshData()
          } else {
            setForm({slug: '', description: '', inventery: '',price: '',id: ''})
            refreshData()
  
          }
        }
          )
      } catch (error) {
        console.log(error);
      }
    }
  
  
    async function deleteProduct(id: string) {
      try {
       fetch(`http://localhost:3000/api/product/${id}`, {
         headers: {
           "Content-Type": "application/json",
         },
         method: 'DELETE'
       }).then(() => {
         refreshData()
       })
      } catch (error) {
       console.log(error); 
      }
    }
  
    const handleSubmit = async (data: FormData) => {
      try {
       create(data) 
      } catch (error) {
        console.log(error);
      }
    }
    
  return (
  
    
    <div >
   
   <nav className="flex items-center justify-between flex-wrap  bg-sky-700  p-6">
  <div className="flex items-center flex-shrink-0 text-white mr-6">
    
    <span className="font-semibold text-xl tracking-tight">CRUD PRODUCT</span>
  </div>
  <div className="block lg:hidden">
    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="text-sm lg:flex-grow">
      <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Home
      </a>
      <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
      Products
      </a>
      <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
        Contacto
      </a>
    </div>

    <div  className="flex items-center flex-shrink-0 text-white mr-6">
 
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
        To pay
      </a>
    </div>
  </div>
</nav>
       <h1 className="text-center font-bold text-2xl mt-4">Product</h1>
      <form onSubmit={e => {
        e.preventDefault()
        handleSubmit(form)
      }} className='w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch'>
        <input type="text"
          placeholder="Name"
          value={form.slug}
          onChange={e => setForm({...form, slug: e.target.value})}
          className="border-2 rounded border-gray-600 p-1"
        />
        <textarea 
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({...form, description: e.target.value})}
          className="border-2 rounded border-gray-600 p-1"
        />
         <input type="text"
          placeholder="inventery"
          value={form.inventery}
          onChange={e => setForm({...form, inventery: e.target.value})}
          className="border-2 rounded border-gray-600 p-1"
        />
         <input type="text"
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({...form, price: e.target.value})}
          className="border-2 rounded border-gray-600 p-1"
        />
        <button type="submit" className="bg-sky-700  text-white rounded p-1">Add product </button>
      </form>
      <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {product.map(product => (
            <li key={product.id} className="border-b border-gray-600 p-2">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="font-bold">{product.slug}</h3>
                  <p className="text-sm">{product.description}</p>
                  <p className="text-sm">{product.inventery}</p>
                  <p className="text-sm">{product.price}</p>
                </div>
                <button onClick={() => setForm({slug: product.slug, description: product.description, inventery: product.inventery, price: product.price, id: product.id})} className="bg-blue-500 mr-3 px-3 text-white rounded">Update</button>
                <button onClick={() => deleteProduct(product.id)} className="bg-red-500 px-3 text-white rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async () => {
  const product = await prisma.product.findMany({
    select: {
      slug: true,
      id: true,
      description: true
      
    }
  })

  return {
    props: {
      product
    }
  }
}
