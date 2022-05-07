import Head from 'next/head'
import Tmdb from './api/Tmdb'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'

export default function Home() {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      let originals = list.filter(item => item.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }
    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      }
      else {
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
      </Head>


      <main className={styles.main}>
        <Header black={blackHeader} />
        {featuredData &&
          <FeaturedMovie item={featuredData} />
        }

        <section className={styles.lists}>
          {movieList.map((item, i) => (
            <MovieRow key={i} title={item.title} items={item.items} />
          ))
          }

        </section>

        <footer>
          <p>
            Feito com <span role='img' aria-label='coração'> ♥︎ </span> por Jorge Veiga
          </p>
          <p> Direitos de Imagem para Netflix </p>
         
          <p>Dados pegos do site Themoviedb.org</p>
          
        </footer>
        {movieList.length <= 0 &&
          <div className={styles.loading}>
            <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif" alt="carregando" />
          </div>
        }
        

      </main>
    </div>
  )
}
