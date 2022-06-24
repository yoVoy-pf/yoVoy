import { Pagination } from '@mui/material'
import styles from './PageButtons.module.css'

const PageButtons = ({pageButtonHandler, limit} : any) => {

  return (
    <div>
      {/* {pageButtons} */}
      <div className={styles.buttons_container}>
        <Pagination count={limit} showFirstButton showLastButton color='primary' size='large' onChange={pageButtonHandler}/>
      </div>
    </div>
  )
}

export default PageButtons