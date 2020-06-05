let connection = async ()=>{
    let result;
    try {
        result = await axios({
            method:'get',
            url:'https://jsonplaceholder.typicode.com/posts'
        });
    } catch (error) {
        return [{title : 'errir' ,body: 'error'}]
    }
    

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
        resultList.push({title : elem.title ,body:newBody});
    });

    return resultList;
};

document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('#button').addEventListener('click',async ()=>{
        let result = await connection();
        let list = document.querySelector('#list');
        list.innerHTML = "";
        let printLength = result.length;
        for(let i=0;i<printLength; ++i){
            list.innerHTML += `<li><b>${result[i].title}</b> - ${result[i].body}</li>`
        }
    })
});