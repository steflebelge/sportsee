function getCorrectUserIdName(typeDonnee) {
    switch (typeDonnee) {
        case "USER_MAIN_DATA" :
            return 'id';
            break;
        case "USER_ACTIVITY" :
        case "USER_AVERAGE_SESSIONS" :
        case "USER_PERFORMANCE" :
            return 'userId';
            break;
    }
}

async function fakeFetch(userId, typeDonnee) {
    return fetch("/" + typeDonnee + ".json")
        .then(retourPromesseFetch => {
            return retourPromesseFetch.json()
                .then(retourPromesseJson => {
                    // filtre de l utilisateur par userId + encode JSON ?
                    if(!retourPromesseJson.length || retourPromesseJson.length === 0)
                        throw new Error("Retour API null ou vide");

                    let response;
                    retourPromesseJson.forEach(function (dataTmp) {
                        if(parseInt(dataTmp[getCorrectUserIdName(typeDonnee)]) === parseInt(userId)){
                            let tmp = {
                                data : dataTmp,
                            }
                            response = new Response(JSON.stringify(tmp));
                        }
                    });

                    if(!response) {
                        throw new Error("Utilisateur non trouvé");
                    }

                    return response;

                })
                .catch(err => {
                    throw err;
                })
        })
        .catch(err => {
            throw err;
        });
}

async function fetchData(userId, typeDonnee){
    let urlApi = "http://localhost:3000/user/";
    let endOfUrl = "";

    switch (typeDonnee) {
        case "USER_AVERAGE_SESSIONS" :
            endOfUrl = "/average-sessions";
            break;
        case "USER_PERFORMANCE" :
            endOfUrl = "/performance";
            break;
        case "USER_ACTIVITY" :
            endOfUrl = "/activity";
            break;
        case "USER_MAIN_DATA" :
        default:
            console.log("defaut url");
            break;
    }

    // return fetch(urlApi + userId  + endOfUrl)
    await sleep(250);
    return fakeFetch(userId, typeDonnee)
        .then(retourPromesseFetch => {
            return retourPromesseFetch.json()
                .then(retourPromesseJson => {
                    if(retourPromesseJson.data)
                        return retourPromesseJson.data;
                    return retourPromesseJson;
                })
                .catch(err => {
                    throw err;
                })
        })
        .catch(err => {
            throw err;
        });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export {fetchData};
