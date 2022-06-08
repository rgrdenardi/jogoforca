//Seletores e variáveis

let botaoJogar = document
  .querySelector('.inicio')
  .addEventListener('click', jogo)
let adicionarPalavra = document.querySelector('.area-adicionar')
let botaoAdicionarPalavra = document
  .querySelector('.inicio1')
  .addEventListener('click', areaPalavra)
let areaBotoes = document.querySelector('.area-botoes')
let palavras = ['KALASHNIKOV', 'NIETZSCHE', 'SCHWARZENEGGER', 'ZUCKERBERG', 'RAMANUJAN']
let tabuleiro = document.getElementById('forca').getContext('2d')
document.getElementById('forca').style.display = 'none'
let letras = []
let palavraCorreta = ''
let erros = 10
let contadorAcertos = 0
let letrasEscritas = 0

function jogo() {
  areaBotoes.style.display = 'none'
  document.getElementById('forca').style.display = 'block'
}

function areaPalavra() {
  areaBotoes.style.display = 'none'
  adicionarPalavra.style.display = 'flex'
}

function escolherPalavraSecreta() {
  let palavra = palavras[Math.floor(Math.random() * palavras.length)]
  palavraSecreta = palavra
  return palavra
}

function escreverTracinhos() {
  tabuleiro.lineWidth = 6
  tabuleiro.lineCap = 'round'
  tabuleiro.lineJoin = 'round'
  tabuleiro.strokeStyle = '#0A3871'
  tabuleiro.beginPath()
  let eixo = 600 / palavraSecreta.length
  for (let i = 0; i < palavraSecreta.length; i++) {
    tabuleiro.moveTo(330 + eixo * i, 640)
    tabuleiro.lineTo(380 + eixo * i, 640)
  }
  tabuleiro.stroke()
  tabuleiro.closePath()
}

function desenhaForca() {
  tabuleiro.beginPath()
  tabuleiro.strokeStyle = '#0A3871'
  tabuleiro.moveTo(430, 500)
  tabuleiro.lineTo(700, 500)
  tabuleiro.moveTo(510, 500)
  tabuleiro.lineTo(510, 50)
  tabuleiro.moveTo(510, 50)
  tabuleiro.lineTo(700, 50)
  tabuleiro.moveTo(700, 50)
  tabuleiro.lineTo(700, 120)
  tabuleiro.fill()
  tabuleiro.stroke()
}

function perdeu() {
  alert('voce perdeu otário xd')
  tabuleiro.clearRect(0, 0, 1200, 860)
  escreverTracinhos(escolherPalavraSecreta())
  desenhaForca()
  areaBotoes.style.display = 'flex'
  document.getElementById('forca').style.display = 'none'
}

function fimDeJogo() {
  palavra = []
  contadorAcertos = 0
  erros = 10
  palavraCorreta = ''
  letras = []
  letrasEscritas = 0
  tabuleiro.clearRect(0, 0, 1200, 860)
  escreverTracinhos(escolherPalavraSecreta())
  desenhaForca()
  areaBotoes.style.display = 'flex'
  document.getElementById('forca').style.display = 'none'
}

function desenhaBoneco(erros) {
  switch (erros) {
    case 9:
      tabuleiro.beginPath()
      tabuleiro.arc(700, 150, 30, 0, Math.PI * 2, true)
      tabuleiro.stroke()
      break
    case 8:
      tabuleiro.moveTo(700, 180)
      tabuleiro.lineTo(700, 350)
      tabuleiro.stroke()
      break
    case 7:
      tabuleiro.moveTo(700, 230)
      tabuleiro.lineTo(650, 260)
      tabuleiro.stroke()
      break
    case 6:
      tabuleiro.moveTo(700, 230)
      tabuleiro.lineTo(750, 260)
      tabuleiro.stroke()
      break
    case 5:
      tabuleiro.moveTo(700, 350)
      tabuleiro.lineTo(650, 400)
      tabuleiro.stroke()
      break
    case 4:
      tabuleiro.moveTo(700, 350)
      tabuleiro.lineTo(750, 400)
      tabuleiro.stroke()
      break
    case 3:
      tabuleiro.moveTo(690, 140)
      tabuleiro.lineTo(680, 150)
      tabuleiro.moveTo(680, 140)
      tabuleiro.lineTo(690, 150)
      tabuleiro.stroke()
      break
    case 2:
      tabuleiro.moveTo(720, 140)
      tabuleiro.lineTo(710, 150)
      tabuleiro.moveTo(710, 140)
      tabuleiro.lineTo(720, 150)
      tabuleiro.stroke()
      break
    case 1:
      tabuleiro.moveTo(680, 160)
      tabuleiro.lineTo(720, 160)
      tabuleiro.stroke()
      tabuleiro.closePath()
      break
    case 0:
      alert('vish, vc perdeu bobao, a palavra era ' + palavraSecreta + ' !')
      fimDeJogo()
  }
}

escreverTracinhos(escolherPalavraSecreta())
desenhaForca()

function escreverLetraCorreta(index) {
  tabuleiro.font = 'bold 52px Inter'
  tabuleiro.lineWidth = 6
  tabuleiro.lineJoin = 'round'
  tabuleiro.lineCap = 'round'
  tabuleiro.strokeStyle = '#0A3871'

  var eixo = 600 / palavraSecreta.length
  tabuleiro.fillText(palavraSecreta[index], 335 + eixo * index, 620)
  tabuleiro.stroke()
  contadorAcertos += 1
}

function escreverLetraIncorreta(letra, errorsLeft) {
  tabuleiro.font = 'bold 40px Inter'
  tabuleiro.lineWidth = 6
  tabuleiro.lineJoin = 'round'
  tabuleiro.lineCap = 'round'
  tabuleiro.strokeStyle = '#0A3871'
  tabuleiro.fillText(letra, 340 + 40 * (10 - errorsLeft), 710, 40)
}

function verificarLetraCorreta(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    console.log(key)
    letras.push(key)
    return false
  } else {
    letras.push(key.toUpperCase())
    return true
  }
}

function adicionarLetraCorreta(i) {
  palavraCorreta += palavraSecreta[i].toUpperCase()
}

function adicionarLetrainCorreta(letter) {
  if (palavraSecreta.indexOf(letter) <= 0) {
    erros -= 1
  }
}

document.onkeydown = e => {
  let letra = e.key.toUpperCase()
  console.log(e.key)
  if (event.keyCode <= 90 && event.keyCode >= 65) {
    if (!verificarLetraCorreta(e.key)) {
      if (palavraSecreta.includes(letra)) {
        adicionarLetraCorreta(palavraSecreta.indexOf(letra))
        for (let i = 0; i < palavraSecreta.length; i++) {
          if (palavraSecreta[i] === letra) {
            escreverLetraCorreta(i)
            if (contadorAcertos == palavraSecreta.length) {
              alert(
                'irrul, vc ganhou fera!, a palavra era ' + palavraSecreta + ' !'
              )
              fimDeJogo()
            }
          }
        }
      } else {
        if (!verificarLetraCorreta(e.key)) return
        adicionarLetrainCorreta(letra)
        escreverLetraIncorreta(letra, erros)
        desenhaBoneco(erros)
      }
    }
  }
}
