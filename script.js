function calcular() {
  const wn = parseFloat(document.getElementById('wn').value);
  const zeta = parseFloat(document.getElementById('zeta').value);

  const wd = wn * Math.sqrt(1 - zeta ** 2);
  const sigma = wn * zeta;

  const tp = Math.PI / wd;
  const tr = (1.8 * wn) / (Math.sqrt(1 - zeta ** 2) * wn);
  const ts5 = 3 / sigma;
  const ts2 = 4 / sigma;
  const maxOvershoot = Math.exp((-zeta * Math.PI) / Math.sqrt(1 - zeta ** 2)) * 100;

  document.getElementById('resultados').innerHTML = `
      <p>Wd: ${wd.toFixed(2)}</p>
      <p>Sigma: ${sigma.toFixed(2)}</p>
      <p>Tempo de Pico: ${tp.toFixed(2)} s</p>
      <p>Tempo de Subida: ${tr.toFixed(2)} s</p>
      <p>Tempo de Acomodação 5%: ${ts5.toFixed(2)} s</p>
      <p>Tempo de Acomodação 2%: ${ts2.toFixed(2)} s</p>
      <p>Máximo Sobressinal: ${maxOvershoot.toFixed(2)}%</p>
  `;

  desenharPolos(sigma, wd);
}

function desenharPolos(sigma, wd) {
  const canvas = document.getElementById('complexPlane');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const scale = 50;

  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(canvas.width, centerY);
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.stroke();

  const pole1X = centerX - sigma * scale;
  const pole1Y = centerY - wd * scale;
  const pole2X = centerX - sigma * scale;
  const pole2Y = centerY + wd * scale;

  ctx.beginPath();
  ctx.arc(pole1X, pole1Y, 5, 0, 2 * Math.PI);
  ctx.arc(pole2X, pole2Y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
}
