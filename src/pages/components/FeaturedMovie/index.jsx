import styles from '../../../styles/FeaturedMovie.module.css'

export default props => {

    const item = props.item

    let firstDate = new Date(item.first_air_date)
    let genresSet = new Set()
    item.genres.forEach(genre => {
        genresSet.add(genre.name)
    })

    let genresArray = Array.from(genresSet)

    let overview = item.overview
    if(overview.length > 200) {
        overview = overview.substring(0,200)+"..."
    }

    return (
        <section className={styles.featured} style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className={styles.featuredVertical}>
                <div className={styles.featuredHorizontal}>
                    <div className={styles.featuredName}>{item.original_name}</div>
                    <div className={styles.featuredInfo}>
                        <div className={styles.featuredPoints}>{item.vote_average} pontos</div>
                        <div className={styles.featuredYear}>{firstDate.getFullYear()}</div>
                        <div className={styles.featuredSeasons}>{item.number_of_seasons} temporada{item.number_of_seasons > 1 && 's'}</div>
                    </div>
                    <div className={styles.featuredDescription}>{overview}</div>
                    <div className={styles.featuredButtons}>
                        <a className={styles.featuredWatchButton} href={`/watch/${item.id}`}>► Assistir</a>
                        <a className={styles.myListButton} href={`/add/${item.id}`}>+ Minha Lista</a>
                    </div>
                    <div className={styles.featuredGenres}><strong>Gêneros:</strong> {genresArray.join(', ')}</div>
                </div>
            </div>
        </section>  
    )
}