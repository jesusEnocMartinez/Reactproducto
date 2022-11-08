
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
       fetch(`http://localhost:3000/api/note/${id}`, {
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
       <h1 className="text-center font-bold text-2xl mt-4">Product</h1>
      <form onSubmit={e => {
        e.preventDefault()
        handleSubmit(form)
      }} className='w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch'>
        <input type="text"
          placeholder="Title"
          value={form.slug}
          onChange={e => setForm({...form, slug: e.target.value})}
          className="border-2 rounded border-gray-600 p-1"
        />
        <textarea 
          placeholder="Content"
          value={form.description}
          onChange={e => setForm({...form, description: e.target.value})}
          className="border-2 rounded border-gray-600 p-1"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-1">Add </button>
      </form>
      <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {product.map(product => (
            <li key={product.id} className="border-b border-gray-600 p-2">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="font-bold">{product.slug}</h3>
                  <p className="text-sm">{product.description}</p>
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
