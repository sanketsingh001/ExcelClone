for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur",(e)=>{
           let address=addressbar.value; 
           let [activeCell,cellProp]=activecell(address);
           let enteredData=activeCell.innerText;

           cellProp.value=enteredData;
           
        })
    }


}
let formulaBar=document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown",(e)=>{
    let inputFormula=formulaBar.value
if(e.key==="Enter" && inputFormula ){

let evaluatedValue=evaluateFormula(inputFormula);

//To update UI and cell Properties in DB
setCellUIAndCellProp(evaluatedValue,inputFormula);
}

})
function evaluateFormula(formula){
    return eval(formula);
}

function setCellUIAndCellProp(evaluatedValue,formula){
    let address=addressbar.value;
    let[cell,cellProp]=activecell(address);
    //UI update
    cell.innerText=evaluatedValue
    //DB update
    cellProp.value=eval;
    cellProp.formula=formula;
}