# nubitat

## Instalando.

1. Instalar Ionic. 

http://ionicframework.com/getting-started/

2. Iniciar un proyecto.

````javascript
$ionic start myapp
````

3. Ubicarnos en nuestro proyecto.

4. Remover carpeta ***www/***

5. Clonar nuestro proyecto en la carpeta www/

````javascript
git clone https://github.com/carlosrojaso/nubitat.git www/
````

6. Ejecutar

````javascript
$ionic serve
````

7. Agregar esta linea en el archivo *scss/ionic.app.scss*

````javascript
@import "www/css/main";
````

8. Agregar esta linea en el archivo *gulpfile.js*

````javascript
gulp.task('serve:before',['sass','watch']);
````
