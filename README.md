<div>
    <p align="center">
  <a href="https://ingsistemas.cloud.ufps.edu.co/" target="blank"><img src="https://ww2.ufps.edu.co/public/archivos/elementos_corporativos/logo-horizontal.jpg" width="400" alt="UFPS Logo" /></a>
</p>
    <p align="center">
        <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--egmJbu5X--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/trp0zksm3rffm69rp35z.png" width="400" alt="UFPS Logo" />
    </p>
</div>

# Administración de proyectos de aula - UFPS

Sistema web para la administración de proyectos de aula de clase que permitirá a los docentes de las materias teórico-prácticas de la carrera de ingeniería de sistemas mantener un control de los proyectos que estarán disponibles para realizar en el transcurso del semestre académico. 

# Guia para inicializar el proyecto en desarrollo

1. Clonar el repositorio
2. Ejecutar ```npm i``` para instalar las dependencias necesarias
3. Ir al archivo .env.example y hacer una copia de los campos que se encuentran alli, crear un archivo .env y pegar los campos ahi y completarlos para poder levantar el servidor con la base de datos
4. Ejecutar el siguiente script para levantar el server en modo de desarrollo

```
npm run start:dev
```

# El proyecto tiene las siguiente dependencias instaladas

* TypeScript
* express
* dotenv
* cors
* jsonwedtoken
* Sequelize
* MySql


