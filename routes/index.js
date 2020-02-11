var express = require('express');
var router = express.Router();
const {compGanador}=require('../juego/comprobaciones');

const tablero = [
  [], [], [], [], [], [], []
];

var jugadores = 0;
var turno = 1;


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

  const ganador=compGanador(tablero);

  if (ganador !=0) {
    res.render('winner',{ganador});
  } else {
    const meToca = (turno == session.jugador);
    res.render('index', { title: 'Conecta cuatro', tablero, meToca });
  }

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
