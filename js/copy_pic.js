import Canvas2Image from './canvas2image';

document.addEventListener('DOMContentLoaded', () => {

  // Canvas to Image
  function canvasToImage(canvas) {
    const filename = 'LetsWrite_Demo_' + new Date().getTime();
    Canvas2Image.saveAsPNG(canvas, canvas.width, canvas.height, filename);
  }

  // HTML to Canvas
  function htmlToCanvas(id) {
    const el = document.getElementById(id);
    const config = {
      useCORS: true,
      backgroundColor: '#262626'
    };


  const btnSection1 = document.getElementById('copy_pic');
  btnSection1.addEventListener('click', e => {
    e.preventDefault();
    htmlToCanvas('myTable');
  });

}} );
