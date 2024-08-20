import react from "react";
import { useState , useEffect} from "react";
import papa from 'papaparse'

import moviesCsvFile from '../assets/Data/movies_md.csv'

const MovieCard = () => {

    const [csvData, setCsvData] = useState([])


function csvImport(){
    useEffect(() =>{
        fetch(moviesCsvFile)
        .then(res => res.text())
        .then(data => {
            papa.parse(data, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {setCsvData(result.data)}
            })
        })
    }, [])
    
}

console.log(csvData)

csvImport()



    return(
        <div id="movieCardMainCont">

            <div id="movieCardFirstDiv">
                
            </div>

        </div>
    )
}

export default MovieCard