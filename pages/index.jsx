import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography
} from "@material-tailwind/react";

import Link from 'next/link';

export default function Home() {


  return (
    <>


      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
        <div className='flex flex-col gap-3'>
          <Typography variant="h1" color="blue-gray" >
            Bienvenido
          </Typography>

          <Typography>
            Hola  a todos, se estaran realizando cambios en este sitio 
          </Typography>

          
        </div>


     




    </>
  )
}


