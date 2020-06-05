let connection = async ()=>{
    let result = await axios({
        method:'get',
        url:'https://jsonplaceholder.typicode.com/posts'
    });

    let resultToList = [];
    result.data.forEach(element => {
        resultToList.push(element);
    });

    let list = [];
    let pickCounter = 0;
    while(pickCounter !== 4){
        let numberPick = Math.random() * resultToList.length;
        if(list.find(element=>element === numberPick) === undefined){
            list.push(numberPick)
            ++pickCounter;
        }
    }

    let resultList = [];
    list.forEach(element=>{
        let elem = resultToList[parseInt(element)];
        let newBody = elem.body.replace(/(?:\r\n|\r|\n)/g,"");
        resultList.push(elem.title + " - " + newBody);
    });

    return resultList;
};

$(document).ready(()=>{
    $('#button').click(async ()=>{
        let result = await connection();
        $("#list").empty();
        for(let i=0;i<result.length;++i){
            $("#list").append(`<li>${result[i]}</li>`)  
        }
    })
})