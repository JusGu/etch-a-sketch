const container = document.getElementById("container");
function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";
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

makeRows(50, 50);