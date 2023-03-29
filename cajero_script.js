class Billete
{
  constructor(v, c)
  {
    this.valor = v;
    this.cantidad = c;
    this.imagen = new Image();
    this.imagen.src = imagenes[this.valor]; 
  }
}

var imagenes = [];
imagenes[100]="assets/100_USD.jpg";
imagenes[50]="assets/50_USD.jpg";
imagenes[20]="assets/20_USD.jpg";
imagenes[10]="assets/10_USD.jpg";
imagenes[5]="assets/5_USD.jpg";
imagenes[2]="assets/2_USD.jpg";
imagenes[1]="assets/1_USD.jpg";

var caja = [];
var entregado = [];
caja.push(new Billete(100, 1) );
caja.push(new Billete(50, 3) );
caja.push(new Billete(20, 4) );
caja.push(new Billete(10, 2) );
caja.push(new Billete(5, 2) );
caja.push(new Billete(2,2) );
caja.push(new Billete(1, 2) );


var dinero;
var div;
var papeles;

var cantidad = document.getElementById("cantidad");
var resultado = document.getElementById("resultado");
var b = document.getElementById("extraer");
var reload = document.getElementById('reload');

b.addEventListener("click", entregarDinero);
cantidad.addEventListener("click", existencia);
// reload.addEventListener('click', _ =>
//    { // el _ es para indicar la ausencia de parametros, así también se puede trabajar sin crear una función adicional
//    location.reload();
//    });

function clean()
{
  entregado.splice(0,entregado.length);
  resultado.innerHTML = "";
  return true;
}

function entregarDinero()
{
  var t = document.getElementById("dinero");
  dinero = parseInt(t.value);
  for(var bi of caja)
  {
    if(dinero > 0)
    {
      div = Math.floor(dinero / bi.valor);

      if(div > bi.cantidad)
      {
        papeles = bi.cantidad;
      }
      else
      {
        papeles = div;
      }

      entregado.push( new Billete(bi.valor, papeles) );
      dinero -= (bi.valor * papeles);

      bi.cantidad -= papeles;
    }

  }

  if(dinero > 0)
  {
    resultado.innerHTML = "El banco no puede procesar tu solicitud en este momento";
  }
  else
  {
    for(var e of entregado)
    {
      if(e.cantidad > 0)
      {
        // resultado.innerHTML += "<img src=" + e.imagen.src + " />" + "<strong />" + e.cantidad + " billete(s) de $" + e.valor + "<br />";
        resultado.innerHTML += "<img src=" + e.imagen.src + " />" + '<div class="valor_entregado">' + e.cantidad + " billete(s) de $" + e.valor + '</div>';
        // resultado.innerHTML = '';

        //Eso es una concatenación: aquí se pone += para indicar que lo primero debe volver a ser sumado con lo que sigue de código, también
        //se puede escribir en este caso resultado.innerHTML = y otra vez escribir resultado.innerHTML sumado a todo el resto de código
        //Esto es solo bueno hacerlo cuando es +=, porque también se puede con -= pero no es muy legible y puede enredar el código, por
        //consiguiente generar errores

        // for(var bi = 1; bi <= e.cantidad ;bi++)
        // {

        // }
      }
    }
  }
}

function existencia()
{
  var total = 0;

  for(var bi of caja)
  {
    total += bi.valor * bi.cantidad;
  }
  alert("La cantidad actual de dinero es de $" + total);
}
