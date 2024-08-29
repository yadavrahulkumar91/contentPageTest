"use client"
import Image from "next/image";
import LessonContent from './[slug]/lessonContent/lessonContent'
import AROC from './[slug]/lessonContent/aroc'
import data from './data/data.json'
// import Button from './button'
// import Button from './index'


export default function Home() {
  return (
   <div>
    <div className='bg-orange-300 font-bold text-center align-middle py-2 text-3xl font-serif'>Classification of Animals</div>
   
    <LessonContent lessonContent ={data}/>
    {/* <AROC/> */}

   </div>
  );
}
