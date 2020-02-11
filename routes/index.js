var express = require('express');
var router = express.Router();

const tablero = [
  [], [], [], [], [], [], []
];

var jugadores = 0;
var turno = 1;

function compLinea(a,b,c,d) {
  // Check first cell non-zero and all cells match
  return ((a != 0) && (a ==b) && (a == c) && (a == d));
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
  for (fila = 0; fila < 6; r++) {
    for (columna = 0; columna < 4; columna++) {
      if (compLinea(tablero[fila][columna], tablero[fila][columna+1], tablero[fila][columna+2], tablero[fila][columna+3])) {
        return tablero[fila][columna];
      };
    };
  };


  // Check down-right
  for (fila = 0; fila < 3; r++) {
    for (columna = 0; columna < 4; c++) {
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

/* Pantalla principal del juego. */
router.get('/', function(req, res, next) {
  const session = req.session;
  if (!session.jugador) {
    jugadores++;
    if (jugadores > 2) {
      res.status(403);
    }
    session.jugador = jugadores;
  }
  const meToca = (turno == session.jugador);
  res.render('index', { title: 'Conecta cuatro', tablero, meToca });
});

router.post('/ponerficha', function(req, res, next) {
  const {fila, columna} = req.body;
  const jugador = req.session.jugador;
  tablero[columna].push(jugador);

  // Alternamos el turno
  if (turno == 1) {
    turno = 2;
  } else {
    turno = 1;
  }

  res.redirect("/");
});

router.get("/miturno", function(req, res, next) {
  const meToca = (turno == req.session.jugador);
  if (meToca) {
    res.status(200).json(true); //ok
  } else {
    res.status(400).json(false); //fallo (si no me toca)
  }
});

module.exports = router;
