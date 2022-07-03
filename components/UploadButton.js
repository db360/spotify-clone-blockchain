
const styles = {
    uploadButton: `bg-green-500 mr-10 px-3 py-1.5 cursor-pointer rounded-full hover:scale-95 transition`
}

const UploadButton = ( {setShowUploadMusic} ) => {

    const uploadClicked = () => {
        setShowUploadMusic(true)
        // console.log(setShowUploadMusic);
    }

  return (
    <div>
        <div onClick={uploadClicked} className={styles.uploadButton} >
            Upload Music
        </div>
    </div>
  )
}

export default UploadButton