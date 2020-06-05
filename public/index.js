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
        resultList.push({title : elem.title ,body: " - "+newBody});
    });

    return resultList;
};

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('button').addEventListener('click',async ()=>{
        let result = await connection();
        let list = document.getElementById('list');
        list.innerHTML = "";
        let printLength = result.length;
        for(let i=0;i<printLength; ++i){
            var li = document.createElement('li');
            var b = document.createElement('b');
            b.append(result[i].title);
            li.appendChild(b);
            li.append(result[i].body);
            list.appendChild(li);
        }
    })
});