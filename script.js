const container = document.getElementById("container");
function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  container.style.setProperty('--grid-size', 70/rows + "vh");
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    container.appendChild(cell).id = "grid-item";
    c == 0 ? container.appendChild(cell).classList.add("tl_corner") : null;
    c == cols - 1 ? container.appendChild(cell).classList.add("tr_corner") : null;
    c == rows*cols - cols ? container.appendChild(cell).classList.add("bl_corner") : null;
    c == rows*cols - 1 ? container.appendChild(cell).classList.add("br_corner") : null;
    c <= cols - 1 ?  container.appendChild(cell).classList.add("t_border") : null;
    c % cols == 0 ? container.appendChild(cell).classList.add("l_border") : null;
    (c+1) % cols == 0 ? container.appendChild(cell).classList.add("r_border") : null;
    c >= rows*cols - cols ? container.appendChild(cell).classList.add("b_border") : null;
  };
};
makeRows(30, 30);
const input = document.querySelector('#myRange');
input.addEventListener('input', updateValue);
function updateValue(e) {
  while (container.firstChild) {
    container.firstChild.remove()
  }
  makeRows(e.target.value, e.target.value);
}
let mousedownID = -1;
const items = document.querySelectorAll('#grid-item');
document.addEventListener('mousedown', mousedown);


function mousedown(e) {
  if(mousedownID==-1){
    mousedownID = 1;
    console.log(mousedownID);
  }  
}

document.onmousemove = handleMouseMove;
function handleMouseMove(e){
  if(e.target.id == "grid-item" && mousedownID == 1){
    e.target.style.background = "black"
  };
}
function mouseup(e){
  if(mousedownID==1){
    mousedownID = -1;
  }
}
document.addEventListener("mouseup", mouseup);
document.addEventListener("mouseleave", mouseup);