import styles from './App.css';
import data from './data.js';
import pydic from './pinyin.js';
var currentPoem = {}




analysis('leaver1');

function analysis(num){
    var bank=data[num],
        randomNum=parseInt(Math.random()*bank.length),
        qt=data[num][randomNum];
    currentPoem.title=qt.title;//诗名
    currentPoem.date=qt.date;//诗的朝代
    currentPoem.authod=qt.authod;//诗的作者
    currentPoem.context=qt.context.replace(/。/g,'，').split('，');//诗的内容
    currentPoem.firstText=currentPoem.context[0].split('');
    currentPoem.secondText=currentPoem.context[1].split('');
    currentPoem.poemTable=qt.contextTable.split('');//九宫格里词转成数组
    currentPoem.poemTableList=trans(qt.contextTable.split('')),//九宫格里的词打乱后的数组
    currentPoem.source=qt.source;//诗的来源
    randomText(currentPoem.secondText);
    console.log(currentPoem);
}
//随机取一个关键字
function randomText(str){
    var text=str,
        textLength=text.length,
        random=parseInt(Math.random()*textLength),
        ranText=text[random];
    currentPoem.keyWordRandom=random;//关键字随机数
    currentPoem.keyWord=ranText;//关键字
    var pyFirstIndex=pydic.indexOf(ranText),
        pyLastIndex=pydic.indexOf(',',pyFirstIndex),
        py=pydic.substring(pyFirstIndex+1,pyLastIndex);
    currentPoem.keyWordPy=py;
}
//数组打乱
function trans(list){
    var upsetlist=list,
        listNum=upsetlist.length,
        temp;
    for(var i=0;i<listNum;i++){
        var ran=parseInt(Math.random()*listNum);
        if(i!=ran){
            temp=list[i];
            list[i]=list[ran];
            list[ran]=temp;
        }
    }
    return upsetlist;
}




deleteError(arrayUniq(currentPoem.secondText,currentPoem.poemTableList));
//去除一个错误信息
function deleteError(list){
    var randomNum=parseInt(Math.random()*list.length),
        index=currentPoem.poemTableList.indexOf(list[randomNum]);
        currentPoem.poemTableList.splice(index,1,'');
}
//两个数组去重
function arrayUniq(firstlist,secondlist){
    var newlist=secondlist.concat();
    for(var i=0;i<firstlist.length;i++){
        for(var j=0;j<newlist.length;j++){
            if(firstlist[i]===newlist[j]){
                newlist.splice(j,1);
            }
        }
    }
    return newlist;
}






