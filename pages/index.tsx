import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Fretboard from './chords-app/Fretboard'

export default function Home() {
  return (
    <div className={styles.container}>
      <Fretboard />
    </div>
  )
}
