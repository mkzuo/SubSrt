# SubSrt
SubSrt es una herramienta que permite a los videos leer archivos srt.

#Como Usar
Luego de descargar el archivo [subsrt.js] o [subsrt.min.js] solo debes incluirlo en tu pagina web.

``` html
<head>
  <script src='subsrt.js'></script>
</head>
```
Luego solo debemos añadir un subtitulo srt a nuestro video.

``` html
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track src="subtitulo.srt" kind="subtitles" srclang="es" label="Spanish" default>
</video>
```
SubSrt automaticamente lee los subtitulos y los añade al video.

#Metodos adicionales

####addSrtUrl()
Permite añadir dinamicamente subtitulos desde una url.
``` javascript
video.addSrtUrl('url', 'nombre o label'(opcional), 'lenguaje'(opcional), 'tipo'(opcional));
```
Ejemplo:
``` javascript
video.addSrtUrl('http://example.com/subtitulos.srt', 'MiNuevoSubtitulo', 'es', 'subtitles');
```

####getTrack()
Busca un TextTrack por su nombre o label.
``` javascript
video.getTrack('nombre o label');
```
Ejemplo:
``` javascript
video.getTrack('MiNuevoSubtitulo');
```
Podemos mostrar o esconder un TextTrack previamente agregado de la siguiente manera:
``` javascript
video.getTrack('MiNuevoSubtitulo').mode = "showing"; //Mostramos el TextTrack.
video.getTrack('MiNuevoSubtitulo').mode = "hidden"; //Escondemos el TextTrack.
video.getTrack('MiNuevoSubtitulo').mode = "disabled"; //Desabilitamos el TextTrack.
```

Podemos encontrar mas documentacion de los TextTracks en el siguiente [link].
[subsrt.js]: <https://github.com/ElMarck/SubSrt/raw/master/subsrt.js>
[subsrt.min.js]: <https://github.com/ElMarck/SubSrt/raw/master/subsrt.min.js>
[link]: <http://www.elmarck.ml/2016/02/html-el-elemento-track.html>
