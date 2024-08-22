import Image from "next/image";
import LessonContent from './lessonContent/lessonContent'
import data from './data/data.json'

export default function Home() {
  return (
   <div>
    <div className='bg-orange-300 font-bold text-center align-middle py-2 text-3xl font-serif'>Protozoa</div>
    <LessonContent lessonContent ={data}/>

   </div>
  );
}
