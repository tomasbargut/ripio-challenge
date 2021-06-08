# Ripio challenge

Repo que contiene el codigo para el challenge de Ripio

Para ejecutar siga las instrucciones

## Instrucciones

Se requiere el siguiente software de base

- docker
- docker-compose

Una vez instalados ejecutar el siguiente comando

``` bash
docker-compose up
```

El puerto del front end esta configurado en el 3000. http://localhost:3000.
Se puede configurar con la variable de entorno `FRONT_PORT`


Y el backend esta configurado para service en el puerto 8000. http://localhost:8000.
Se puede configurar con la variable de entorno `BACKEND_PORT`