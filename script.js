const container = document.getElementById("container");
function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  container.style.setProperty('--grid-size', 70/rows + "vh");
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    container.appendChild(cell).classList.add("grid-item");
    c == 0 ? container.appendChild(cell).classList.add("tl_corner") : null;
    c == cols - 1 ? container.appendChild(cell).classList.add("tr_corner") : null;
    c == rows*cols - cols ? container.appendChild(cell).classList.add("bl_corner") : null;
    c == rows*cols - 1 ? container.appendChild(cell).classList.add("br_corner") : null;
    // c <= cols - 1 ?  container.appendChild(cell).classList.add("t_border") : null;
    // c % cols == 0 ? container.appendChild(cell).classList.add("l_border") : null;
    // (c+1) % cols == 0 ? container.appendChild(cell).classList.add("r_border") : null;
    // c >= rows*cols - cols ? container.appendChild(cell).classList.add("b_border") : null;
  };
};
makeRows(10, 10);
const input = document.querySelector('#myRange');
input.addEventListener('input', updateValue);
function updateValue(e) {
  while (container.firstChild) {
    container.firstChild.remove()
  }
  makeRows(e.target.value, e.target.value);
}


// color changing
const color = document.querySelector('#color-picker');
const color1 = document.querySelector('#color1');
const color2 = document.querySelector('#color2');
const color3 = document.querySelector('#color3');
const color4 = document.querySelector('#color4');
const tool1 = document.querySelector('#tool1');
const tool2 = document.querySelector('#tool2');
const tool3 = document.querySelector('#tool3');
const tool4 = document.querySelector('#tool4');
let cur_color = "#EE8CD8";
let cur_selection = color1;
let c1 = "#EE8CD8";
let c2 = "#00F99F";
let c3 = "#00BBF9";
color1.style.boxShadow = "0 0 rgb(69, 69, 69), inset 3px 3px rgb(0, 0, 0, 0.25)";
color.addEventListener('input',changecolor);
function changecolor(e){
  changecolorinner(this.value);
}

function changecolorinner(targetcolor) {
  cur_color = targetcolor;
  color4.style.backgroundColor = cur_color;
  cur_selection.style.backgroundColor = cur_color;
  if (cur_selection == color1) {
    c1 = cur_color;
  } else if (cur_selection == color2) {
    c2 = cur_color;
  } else {
    c3 = cur_color;
  }
}
document.addEventListener('click', select);


function select(e){
  if(e.target == color1 || e.target == color2 || e.target == color3) {
    color_select(e);
  } else if (e.target == tool1 || e.target == tool2 || e.target == tool3 || e.target == tool4){
    tool_select(e);
  }
  
}

function color_select(e) {
  unselect();
  e.target.style.boxShadow = "0 0 rgb(69, 69, 69), inset 3px 3px rgb(0, 0, 0, 0.25)";
  cur_selection = e.target;
  if (e.target == color1) {
    cur_color = c1;
  } else if (e.target == color2) {
    cur_color = c2;
  } else {
    cur_color = c3;
  }
  color4.style.backgroundColor = cur_color;
}

function unselect(){
  cur_selection.style.boxShadow = " 3px 3px rgb(69, 69, 69), inset 0px 0px rgb(0, 0, 0)"
}

// tools changing
let cur_tool = tool1;
function tool_select(e) {
  tool_unselect();
  e.target.style.boxShadow = "0 0 rgb(69, 69, 69), inset 3px 3px rgb(0, 0, 0, 0.25)";
  cur_tool = e.target;
}
tool_select({target:tool1});
function tool_unselect(){
  
  cur_tool.style.boxShadow = " 3px 3px rgb(69, 69, 69), inset 0px 0px rgb(0, 0, 0)"
}

// Drawing
let mousedownID = -1;
document.addEventListener('mousedown', mousedown);


function mousedown(e) {
  if(mousedownID==-1){
    mousedownID = 1;
    handleMouseMove(e);
    if(cur_tool == tool3 && e.target.classList.contains("grid-item")){
      const all_tiles = document.querySelectorAll(".grid-item");
      for (let i = 0; i < all_tiles.length; i++){
        all_tiles[i].style.background = cur_color;
      }
      tool_select({target: tool1});
    } else if (cur_tool == tool4 && e.target.classList.contains("grid-item")) {
      changecolorinner(e.target.style.backgroundColor);
      tool_select({target: tool1});
    }
  }
}

document.onmousemove = handleMouseMove;
function handleMouseMove(e){
  if(e.target.classList.contains("grid-item") && mousedownID == 1){
    if(cur_tool == tool1){
      e.target.style.background = cur_color;
    } else if (cur_tool == tool2){
      e.target.style.background = "whitesmoke";
    } 
  };
}
function mouseup(e){
  if(mousedownID==1){
    mousedownID = -1;
  }
}
document.addEventListener("mouseup", mouseup);
document.addEventListener("mouseleave", mouseup);

