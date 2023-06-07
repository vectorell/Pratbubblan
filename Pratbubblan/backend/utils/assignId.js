// import { getDb } from "../database/database.js";
// import { db } from "../routes/userRoutes.js"


// export async function assignId(idtype, dblist) {
//     // let db = getDb('db.json', {})
//     // await db.read()

//     let sortByHighestId = await db.data[dblist].sort((a,b) => b[idtype] - a[idtype])
//     // console.log(sortByHighestId)

//     let highestIdFound = sortByHighestId[0][idtype]
//     // console.log(highestIdFound)
    
//     let newId = highestIdFound + 1
//     // console.log(newId)

//     // await db.write()

//     return await newId
// }


export function random (length = 8) {
    return Math.floor(Math.random() * 999999999999) + 1;
};