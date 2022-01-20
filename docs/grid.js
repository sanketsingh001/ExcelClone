let rows=100;
let cols=26;
let addressbar=document.querySelector(".address-bar")
let addresscolcont=document.querySelector(".address-col-cont")
let addressrowcont=document.querySelector(".address-row-cont")
let cellscont=document.querySelector(".cells-cont");
for(let i=0;i<rows;i++){
    let addressCol=document.createElement("div");
    addressCol.setAttribute("class","address-col");
    addressCol.innerText=i+1;
    addresscolcont.appendChild(addressCol);

}


for(let i=0;i<cols;i++){
    let addressRow=document.createElement("div");
    addressRow.setAttribute("class","address-row");
    addressRow.innerText=String.fromCharCode(65+i);
    addressrowcont.appendChild(addressRow);
}

for(let i=0;i<rows;i++ ){
    let rowCont=document.createElement("div");
    rowCont.setAttribute("class","rowCont");
    for(let j=0;j<cols;j++){
        let cell=document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true");
      //removes the red underline for spell checkl
        cell.setAttribute("spellcheck",false);
        //attributes for cell and storage identification
        cell.setAttribute("rid",i);
       cell.setAttribute("cid",j);
        rowCont.appendChild(cell);
        addListenerForAddressBarDisplay(cell,i,j);


    }
    cellscont.append(rowCont);

}

function addListenerForAddressBarDisplay(cell,i,j){
    cell.addEventListener("click",(e)=>{
        let rowID= i+1;
        let colID= String.fromCharCode(65+j);
        
addressbar.value=`${colID }${rowID}`;
    })

}

//By default clicking on First cell(This will by default click on first cell via Dom)
let firstCell=document.querySelector(".cell");
firstCell.click();