let addSheetBtn=document.querySelector(".sheet-add-icon");
let sheetsFolderCont=document.querySelector(".sheets-folder-cont")



addSheetBtn.addEventListener("click",(e)=>{
let sheet=document.createElement("div");
sheet.setAttribute("class","sheet-folder");


let allSheetFolders=document.querySelectorAll(".sheet-folder");
sheet.setAttribute("id",allSheetFolders.length);
sheet.innerHTML=`  <div class="sheet-content"> Sheet ${allSheetFolders.length+1}</div>`;
sheetsFolderCont.appendChild(sheet);
createSheetDB();
handleSheetActiveness(sheet);
handleSheetRemoval(sheet);
sheet.click();

})
function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown",(e)=>{
       //0 means left button 1//means scorll and 2means right
let allSheetFolders=document.querySelectorAll(".sheet-folder");

if(e.button!=2) return;
if(allSheetFolders.length==1){
    alert("You need to have At least one sheet");
    return;
}
let response =confirm("Your sheet will be removed permanently, Are You sure")
if(response==false) return;

let sheetIdx =  Number(sheet.getAttribute("id"));
collectedSheetDB.splice(sheetIdx,1);

//ui removal
handleSheetUIRemoval(sheet)
//By default assign DB to sheet 1 to active
sheetDB=collectedSheetDB[0];
handleSheetProperties();
  })

}


function handleSheetUIRemoval(sheet){
    sheet.remove();
    let allSheetFolders=document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolders.length;i++){
        allSheetFolders[i].setAttribute("id",i);
        let sheetContent=allSheetFolders[i].querySelector(".sheet-content");
        sheetContent.innerText=`Sheet ${i+1}`;
        allSheetFolders[i].style.backgroundColor="transparent";
    }
    allSheetFolders[0].style.backgroundColor="#ced6e0"
   
}



function handleSheetDB(sheetIdx){
    sheetDB=collectedSheetDB[sheetIdx];
    
}

function handleSheetProperties(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
let firstCell=document.querySelector(".cell");
firstCell.click();
}


function handleSheetUI(sheet){

    let allSheetFolders=document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolders.length;i++){
        allSheetFolders[i].style.backgroundColor="transparent";

    }
    sheet.style.backgroundColor="#ced6e0"
}


function handleSheetActiveness(sheet){
    sheet.addEventListener("click",(e)=>{
      let sheetIdx =  Number(sheet.getAttribute("id"));
      handleSheetDB(sheetIdx);
      handleSheetProperties();
      handleSheetUI(sheet);

    })
}
function createSheetDB(){
    let sheetDB=[];
    for(let i=0;i<rows;i++){
       let  sheetRow=[];
        for(let j=0;j<cols;j++){
          let cellProp={
  bold:false,
  italic:false,
  underline:false,
  alignment:"left",
  fontFamily: "Noto Sans",
  fontSize:"14",
  fontColor: "#000000",
  BGColor:"#ecf0f1",// Just for indication purpose
  value:"",
  formula:"",
  children:[],
          }
  sheetRow.push(cellProp);
        }
        sheetDB.push(sheetRow);
    }
    collectedSheetDB.push(sheetDB);
}

