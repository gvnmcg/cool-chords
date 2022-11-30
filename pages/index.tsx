import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import Fretboard from './chords-app/Fretboard'
import FretboardApp from './chords-app/ts-src/FretboardApp'

export default function Home() {
  return (
    <div className={styles.container}>
      <FretboardApp />
    </div>
  )
}
