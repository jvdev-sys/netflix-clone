import styles from '../../../styles/MovieRow.module.css'
import { useState } from 'react'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function MovieRow (props) {

    const [scrollX, setScrollX] = useState(0)

    const imgUrl = 'https://image.tmdb.org/t/p/w300'
    const title = props.title
    const items = props.items

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth/2);
        if(x > 0) {
            x = 0;
        }
        setScrollX(x)
    }
    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150
        if((window.innerWidth - listW) > x){
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x)
    }

    return (
        <div className={styles.movieRow}>
            <h2>{title}</h2>

            <div className={styles.movieRowLeft} onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50, fontColor: '#fff'}}/>
            </div>

            <div className={styles.movieRowRight} onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}}/>
            </div>

            <div className={styles.movieRowListArea}>
                <div className={styles.movieRowList} style= {{ 
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div className={styles.movieRowItem} key={key}>
                            <img src={`${imgUrl}${item.poster_path}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}