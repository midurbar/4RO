function compLinea(a,b,c,d) {
    // Check first cell non-zero and all cells match
    return ((a) && (a ==b) && (a == c) && (a == d));
  }
  
  function compGanador(tablero) {
    // Check down
    for (fila = 0; fila < 3; fila++) {
      for (columna = 0; columna < 7; columna++) {
        if (compLinea(tablero[fila][columna], tablero[fila+1][columna], tablero[fila+2][columna], tablero[fila+3][columna])) {
          return tablero[fila][columna];
        };
      };
    };
  
    // Check right
    for (fila = 0; fila < 6; fila++) {
      for (columna = 0; columna < 4; columna++) {
        if (compLinea(tablero[fila][columna], tablero[fila][columna+1], tablero[fila][columna+2], tablero[fila][columna+3])) {
          return tablero[fila][columna];
        };
      };
    };
  
  
    // Check down-right
    for (fila = 0; fila < 3; fila++) {
      for (columna = 0; columna < 4; columna++) {
        if (compLinea(tablero[fila][columna], tablero[fila+1][columna+1], tablero[fila+2][columna+2], tablero[fila+3][columna+3])) {
          return tablero[fila][columna];
        };
      };
    };
  
    // Check down-left
    for (fila = 3; fila < 6; fila++) {
      for (columna = 0; columna < 4; columna++) {
        if (compLinea(tablero[fila][columna], tablero[fila-1][columna+1], tablero[fila-2][columna+2], tablero[fila-3][columna+3])) {
          return tablero[fila][columna];
        };
      };
    };
  
    return 0;
  }

  module.exports = {
    compGanador
}