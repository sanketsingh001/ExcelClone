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
BGColor:"#ecf0f1"// Just for indication purpose

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

let BGColor=document.querySelector(".BGcolor-prop");
let alignment=document.querySelectorAll(".alignment");

let leftAlign=alignment[0];
let centerAlign=alignment[1];
let rightAlign=alignment[2];

 let activecolorProp="#d1d8e0"
 let inactiveColorProp="#ecf0f1"

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


fontSize.addEventListener("change",(e)=>{
    let address=addressbar.value;
    let[cell, cellProp]=activecell(address);

    cellProp.fontSize=fontSize.value;//Data Change

    cell.style.fontSize=cellProp.fontSize+"px";
    fontSize.value=cellProp.fontSize;
})

fontFamily.addEventListener("change",(e)=>{
    let address=addressbar.value;
    let[cell, cellProp]=activecell(address);

    cellProp.fontFamily=fontFamily.value;//Data Change

    cell.style.fontFamily=cellProp.fontFamily;
    fontFamily.value=cellProp.fontFamily;
    
})


//COlor and BG color
fontColor.addEventListener("change",(e)=>{
    let address=addressbar.value;
    let[cell, cellProp]=activecell(address);


    cellProp.fontColor=fontColor.value;//Data Change

    cell.style.color=cellProp.fontColor;
    fontColor.value=cellProp.fontColor;
})
BGColor.addEventListener("change",(e)=>{
    let address=addressbar.value;
    let[cell, cellProp]=activecell(address);


    cellProp.BGColor=BGColor.value;//Data Change

    cell.style.backgroundColor=cellProp.BGColor;
    BGColor.value=cellProp.BGColor;
})


//Alignment for Texts
alignment.forEach((alignElem) => {
    alignElem.addEventListener("click",(e)=>{
        //accesing cell
        let address=addressbar.value;
        let[cell, cellProp]=activecell(address);


        let alignValue=e.target.classList[0];
        cellProp.alignment=alignValue;//Data Change
        cell.style.textAlign=cellProp.alignment;
  
        

        switch(alignValue){//ui change part 2

            case "left":
                leftAlign.style.backgroundColor=activecolorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "center":
                centerAlign.style.backgroundColor=activecolorProp;
                leftAlign.style.backgroundColor=inactiveColorProp
                
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "right":
                rightAlign.style.backgroundColor=activecolorProp;
                leftAlign.style.backgroundColor= inactiveColorProp;
                centerAlign.stylebackgroundColor= inactiveColorProp;
                
                break;
        }


    })

})

//UI change for each click on cell
let allcells=document.querySelectorAll(".cell");
for(let i=0 ;i<allcells.length;i++){
    addListenerToAttachCellProperties(allcells[i])
}
function addListenerToAttachCellProperties(cell){
    cell.addEventListener("click",(e)=>{
    let address= addressbar.value;
    let[cell, cellProp]=activecell(address);
     



        //Apply cell properties
        cell.style.fontWeight=cellProp.bold? "bold":"normal";
        cell.style.fontStyle=cellProp.italic? "italic":"normal";
        cell.style.textDecoration=cellProp.underline? "underline":"none";
        cell.style.fontSize=cellProp.fontSize+"px";
        cell.style.fontFamily=cellProp.fontFamily;
        cell.style.color=cellProp.fontColor;
        cell.style.backgroundColor=cellProp.BGColor;
        cell.style.textAlign=cellProp.alignment;

        switch(cellProp.alignment){//ui change part 2

            case "left":
                leftAlign.style.backgroundColor=activecolorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "center":
                centerAlign.style.backgroundColor=activecolorProp;
                leftAlign.style.backgroundColor=inactiveColorProp
                
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "right":
                rightAlign.style.backgroundColor=activecolorProp;
                leftAlign.style.backgroundColor= inactiveColorProp;
                centerAlign.stylebackgroundColor= inactiveColorProp;
                
                break;
        }


        //Apply UI properties to all containers

bold.style.backgroundColor=cellProp.bold? activecolorProp : inactiveColorProp;
italic.style.backgroundColor=cellProp.italic? activecolorProp : inactiveColorProp;
underline.style.backgroundColor=cellProp.underline? activecolorProp : inactiveColorProp;
fontSize.value=cellProp.fontSize;
fontFamily.value=cellProp.fontFamily;
fontColor.value=cellProp.fontColor;
BGColor.value=cellProp.BGColor;





    })

}





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