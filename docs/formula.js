for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur",(e)=>{
           let address=addressbar.value; 
           let [activeCell,cellProp]=activecell(address);
           let enteredData=activeCell.innerText;
           if(enteredData === cellProp.value)
           return;

           cellProp.value=enteredData;
        //    removeChildFromParent(cellProp.formula); ///ERROR COMING FOR HARDCOADED ONE SOLVE LATER
        //    cellProp.formula="";
        //    updateChildrenCells(address);
           
        })
    }


}
let formulaBar=document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown",(e)=>{
    let inputFormula=formulaBar.value;
if(e.key==="Enter" && inputFormula ){

// IF change in formula break old parent child relation .
let address=addressbar.value;
let [cell,cellProp]=activecell(address);
if(inputFormula !== cellProp.formula)
removeChildFromParent(cellProp.formula);


let evaluatedValue=evaluateFormula(inputFormula);


//To update UI and cell Properties in DB
setCellUIAndCellProp(evaluatedValue,inputFormula,address);
addChildToParent(inputFormula);

updateChildrenCells(address);


}
function updateChildrenCells(parentAddress){
    let [parentCell, parentcellProp]=activecell(parentAddress);
    let children=parentcellProp.children;
    for(let i=0;i<children.length;i++){
        let childaddress =children[i];
        let [childCell,childCellProp] = activecell(childaddress);
        
        let childFormula=childCellProp.formula;
     let evaluatedValue=   evaluateFormula(childFormula);
setCellUIAndCellProp(evaluatedValue,childFormula,childaddress);
updateChildrenCells(childaddress);
    }

}


})
function addChildToParent(formula){
    let childaddress=addressbar.value;
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [parent,parentcellProp]=activecell(encodedFormula[i]);
        parentcellProp.children.push(childaddress);
                }
   
    }


}

function removeChildFromParent(formula){
    let childaddress=addressbar.value;
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [parent,parentcellProp]=activecell(encodedFormula[i]);
        let idx= parentcellProp.children.indexOf(childaddress);
        parentcellProp.children.splice(idx,1);
                }
   
    }
}




function evaluateFormula(formula){
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue=encodedFormula[i].charCodeAt(0);
       //checking wheter it is  Direct ecpression or not
        if(asciiValue>=65 && asciiValue<=90){
    let [cell,cellProp]=activecell(encodedFormula[i]);
encodedFormula[i]= cellProp.value;
        }

    }
    let decodedFormula=encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue,formula,address){
 
    let[cell,cellProp]=activecell(address);
    //UI update
    cell.innerText=evaluatedValue
    //DB update
    cellProp.value=evaluatedValue;
    cellProp.formula=formula;
}