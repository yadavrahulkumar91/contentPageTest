import React from 'react'
import CoverPage from './CoverPage'
import ContentPage from './ContentPage'
import Sidebar from './Sidebar'
import axios from 'axios'
import Unit from './unit'


export async function generateStaticParams () {
  const {
    data: { data: axiosData }
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jsonbooks?populate=classes.jsonbooks,jsonbooks,Profile_picture`
  )

  


  return axiosData.map(data => ({
    slug: data.id.toString()
  }))
}

export default async function Page ({ params }) {
  const { slug } = params


  const {
    data: { data: axiosData }
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jsonbooks/${slug}?populate=unit.Lesson.MCQ,unit.Lesson.Question_answer.Asked_year,unit.Lesson.Question_answer.Marks`
  )

  if (!axiosData) {
    return <div>Loading...</div>
  }
  const { attributes } = axiosData

  return (
    <>
    {/* <div style={{display:"flex"}}> */}
      {/* <Sidebar units={attributes.unit} /> */}
        {/* <CoverPage params={params} /> */}
        {/* <ContentPage units={attributes.Unit} /> */}
        <Unit units={attributes.unit}/>
        
      {/* </div> */}
    {/* </div> */}
    </>
  )
}
