let sheetDB=[];
  for(let i=0;i<rows;i++){
     let  sheetRow=[];
      for(let j=0;j<cols;j++){
        let cellProp={
bold:false,
italic:false,
underline:false,
alignment:"left",
fontFamily: "monospace",
fontSize:"14",
fontColor: "#000000",
BGColor:"#000000"// Just for indication purpose

        }
sheetRow.push(cellProp);
      }
      sheetDB.push(sheetRow);
  }

//Selectors for cell Properties

let bold=document.querySelector(".bold");

let italic=document.querySelector(".italic");

let underline=document.querySelector(".underline");

let fontSize=document.querySelector(".font-size-prop");
let fontFamily=document.querySelector(".font-family-prop");
let fontColor=document.querySelector(".font-color-prop");

let BGColor=document.querySelector(".BGColor");
let alignment=document.querySelectorAll(".alignment");

let leftAlign=alignment[0];
let centerAlign=alignment[1];
let rightAlign=alignment[2];

 let activecolorProp="#d1d8e0"
 let inactiveColorProp="#ecf0d1"

//Attach property listeners
//Application of Two way Binding
bold.addEventListener("click",(e)=>{
    let address=addressbar.value;
activecell(address);

let[cell, cellProp]=activecell(address);

//Modification

cellProp.bold= !cellProp.bold;// Data change Done
cell.style.fontWeight=cellProp.bold? "bold":"normal";//UI chnage(1);
bold.style.backgroundColor=cellProp.bold? activecolorProp : inactiveColorProp;


})
italic.addEventListener("click",(e)=>{
    let address=addressbar.value;
activecell(address);

let[cell, cellProp]=activecell(address);

//Modification

cellProp.italic= !cellProp.italic;// Data change Done
cell.style.fontStyle=cellProp.italic? "italic":"normal";//UI chnage(1);
italic.style.backgroundColor=cellProp.italic? activecolorProp : inactiveColorProp;


})

underline.addEventListener("click",(e)=>{
    let address=addressbar.value;
activecell(address);

let[cell, cellProp]=activecell(address);

//Modification

cellProp.underline= !cellProp.underline;// Data change Done
cell.style.textDecoration=cellProp.underline? "underline":"none";//UI chnage(1);
underline.style.backgroundColor=cellProp.underline? activecolorProp : inactiveColorProp;


})


function activecell(address){
   let [rid,cid]= decodeRIDCIDFromAddress(address);
//Access Cell and storing in Storage
let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
// console.log(rid,cid)
let cellProp=sheetDB[rid][cid];

return [cell,cellProp];


}
function decodeRIDCIDFromAddress(address){
//address ->"A1"
let rid=Number(address.slice(1))-1;
let cid= Number(address.charCodeAt(0))-65;//"A" ->65
return [rid,cid];

}