import Image from "next/image";
import Render from './render'
import data from './data/protozoa.json'

export default function Home() {
  return (
   <div>
    <Render pericardiumData ={data}/>

   </div>
  );
}
