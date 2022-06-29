const styles = {
    th: `pb-5 hover:opacity-50 cursor-pointer`
}


const TableRow = ({song}) => {
  return (
    <tbody>
        <tr>
            <th className={styles.th}>{song.index}</th>
            <th className={styles.th}>
                <div>
                    <p className="font-bold">{song.title}</p>
                    <p className="opacity-50">{song.artist}</p>
                </div>
            </th>
            <th className={styles.th}>{song.plays}</th>
            <th className={styles.th}>{song.songLength}</th>
        </tr>
    </tbody>
  )
}

export default TableRow