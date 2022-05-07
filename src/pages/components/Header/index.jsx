import styles from '../../../styles/Header.module.css'


export default function Header (props) {

  let black = props.black
  console.log(black)

  const stylesRollDown = {
    header: {
      background: black ? "" : "transparent",
      backgroundColor: black ? "#141414" : "",
    }
  };

  return (
    <header className={styles.header} style={stylesRollDown.header} >
      
        <div className={styles.headerLogo}>
          <a href="">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png" alt="" />
          </a>
        </div>
        <div className={styles.headerUser}>
          <a href="">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117" alt="" />
          </a>
        </div>
        
    </header>
  )
}
