function cleanData(dataType, data){
    if (!data)
        return false;
    if(data.data)
        data=data.data;
    switch (dataType) {
        case "USER_MAIN_DATA" :
            if(!data.todayScore)
                data.todayScore=data.score;
            data.todayScore = data.todayScore * 100;
            return data;
            break;
        case "USER_ACTIVITY" :
        case "USER_PERFORMANCE" :
        case "USER_AVERAGE_SESSIONS" :
            return data;
            break;
    }

    return false;
}

export default cleanData;
