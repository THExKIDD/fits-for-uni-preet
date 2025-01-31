import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state.product.allSubCategory)
    const loadingCardNumber = new Array(6).fill(null)

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                setData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }

    const handleRedirectProductListpage = ()=>{
        const subcategory = subCategoryData.find(sub =>{
            const filterData = sub.category.some(c => {
                return c._id == id
            })
            return filterData ? true : null
        })
        const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`
        return url
    }

    const redirectURL = handleRedirectProductListpage()
    
    return (
        <div className='bg-gray-50 py-4 dark:bg-gray-800 dark:text-white'>
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl text-gray-800 dark:text-white'>{name}</h3>
                <Link 
                    to={redirectURL} 
                    className='text-red-600 hover:text-red-400 font-medium transition-colors'
                >
                    See All
                </Link>
            </div>
            <div className='relative flex items-center'>
                <div 
                    className='dark:text-white flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth' 
                    ref={containerRef}
                >
                    {loading &&
                        loadingCardNumber.map((_, index) => (
                            <CardLoading 
                                key={"CategorywiseProductDisplay123" + index} 
                                className='bg-red-50 animate-pulse dark:bg-gray-700 dark:text-white'
                            />
                        ))
                    }

                    {data.map((p, index) => (
                        <CardProduct
                            data={p}
                            key={p._id + "CategorywiseProductDisplay" + index}
                            className='dark:text-white hover:shadow-md transition-shadow '
                        />
                    ))}
                </div>
                <div className='w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between dark:text-white'>
                    <button 
                        onClick={handleScrollLeft} 
                        className='dark:bg-gray-700 dark:text-white z-10 relative bg-white hover:bg-red-50 shadow-lg text-lg p-2 rounded-full border border-gray-200 '
                    >
                        <FaAngleLeft className='text-gray-700 hover:text-red-600'/>
                    </button>
                    <button 
                        onClick={handleScrollRight} 
                        className='dark:bg-gray-700 dark:text-white z-10 relative bg-white hover:bg-red-50 shadow-lg p-2 text-lg rounded-full border border-gray-200'
                    >
                        <FaAngleRight className='text-gray-700 hover:text-red-600'/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay