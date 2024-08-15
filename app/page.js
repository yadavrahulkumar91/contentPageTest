import Image from "next/image";
import Render from './render'
import data from './data/data.json'

export default function Home() {
  return (
   <div>
    <Render pericardiumData ={data}/>

   </div>
  );
}
