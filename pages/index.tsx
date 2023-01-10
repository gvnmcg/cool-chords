import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FretboardApp from './chords-app/FretboardApp'

export default function Home() {
  return (
    <div className={styles.container}>
      <a className={styles.title}> Cool Chords </a>
      <FretboardApp />
    </div>
  )
}
