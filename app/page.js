import Image from "next/image";
import LessonContent from './lessonContent/lessonContent'
import data from './data/data.json'

export default function Home() {
  return (
   <div>
    <LessonContent lessonContent ={data}/>

   </div>
  );
}
