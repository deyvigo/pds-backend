
### En las operaciones que requieren estar logeado
```js
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'mode': 'cors'
  }
```

### Administrador

<span style="color:red">POST</span> http://localhost:3210/login/administrador **Inicia sesion**

```javascript
  data = {
    username, 
    password
  }
```

<span style="color:red">GET</span> http://localhost:3210/profesor **Obtiene TODOS los profesores**

<span style="color:red">GET</span> http://localhost:3210/curso **Obtiene TODOS los cursos**

<span style="color:red">GET</span> http://localhost:3210/alumno **Obtiene TODOS los estudiantes**

<span style="color:red">GET</span> http://localhost:3210/ciclo **Obtiene TODOS los ciclos**

<span style="color:red">GET</span> http://localhost:3210/tema **Obtiene TODOS los temas**

<span style="color:red">GET</span> http://localhost:3210/horario **Obtiene TODOS los horarios POR CURSO**

```javascript
  data = {
    idCurso
  }
```

<span style="color:red">PUT</span> http://localhost:3210/profesor/autorizar **Acepta cuenta de profesor**

```javascript
  data = {
    idProfesor,
    idAutorizante, // id_administrador que acepta la cuenta
    estado // 'activo' o 'inactivo'
  }
```

<span style="color:red">POST</span> http://localhost:3210/ciclo **Crea un ciclo**

```javascript
  data = {
    ciclo // string, ejemplo: 2024-1
  }
```

<span style="color:red">POST</span> http://localhost:3210/curso **Crea un curso**

```javascript
  data = {
    codigo, 
    nombre, 
    nivel, // 1, 2, 3
    requisito, // id_curso que es requisito, null si no hay requisito
    idCreador // id_administrador que crea la cuenta
  }
```

<span style="color:red">POST</span> http://localhost:3210/horario **Crea un horario**

```javascript
  data = {
    dia, // lunes, martes ...
    estado, // inactivo, activo, en curso, finalizado
    horaInicio, // Formato: 24 horas HH:MM
    horaFinal,
    ciclo, // id_horario Nota: usar un input select para mostrar los ciclos y obtener los id
    idProfesor, // profesor a cargo
    idCurso 
  }
```

<span style="color:red">PUT</span> http://localhost:3210/horario **Cambia el estado de un horario**

```javascript
  data = {
    idHorario,
    estado // inactivo, activo, en curso, finalizado
  }
```

<span style="color:red">POST</span> http://localhost:3210/tema **Crea un Tema para un curso**

```javascript
  data = {
    idCurso,
    nombre,
    descripcion
  }
```

### Profesor

<span style="color:red">GET</span> http://localhost:3210/horario/profesor **Obtiene TODOS sus horarios en curso según profesor**

```javascript
  data = {
    idProfesor
  }
```

<span style="color:red">GET</span> http://localhost:3210/horario/alumno **Obtiene TODOS los alumnos matriculados a un horario**

```javascript
  data = {
    idHorario
  }
```

<span style="color:red">POST</span> http://localhost:3210/asistencia **Guarda los datos de una asistencia**

```javascript
  // ejemplo de lo que se tiene que mandar
  data = {
    data: [
      {
        "idAlumno": 1,
        "idHorario": 1,
        "asistencia": "P",
        "fecha": "2024-02-19"
      },
      {
        "idAlumno": 2,
        "idHorario": 1,
        "asistencia": "T",
        "fecha": "2024-02-19"
      }
    ]
  }
```

<span style="color:red">GET</span> http://localhost:3210/tema **Obtiene TODOS los temas POR CURSO**

```javascript
  data = {
    idCurso
  }
```

<span style="color:red">POST</span> http://localhost:3210/fichanota **Guarda las notas**

```javascript
  data = {
    "data": [
      {
        "idAlumno": 1,
        "idTema": 3,
        "idCiclo": 1,
        "notaEvaOral": 13,
        "notaEvaEscrita": 12,
        "puntosTiempo": 1,
        "puntosContenido": 4,
        "puntosHabComu": 5,
        "puntosEstructura": 4 
      },
      {
        "idAlumno": 3,
        "idTema": 3,
        "idCiclo": 1,
        "notaEvaOral": 14,
        "notaEvaEscrita": 15,
        "puntosTiempo": 2,
        "puntosContenido": 4,
        "puntosHabComu": 5,
        "puntosEstructura": 3 
      }
    ]
  }
```

### Alumno

**Para matricularse: mostrar los horarios disponibles por nivel y que estén activos**

<span style="color:red">GET</span> http://localhost:3210/horario/nivel **Obtiene los horarios**

```javascript
  data = {
    nivel // nivel del alumno
    idALumno
  }
```

<span style="color:red">POST</span> http://localhost:3210/matricula **Guarda las matrículas**

```javascript
  // ejemplo de lo que se debe enviar
  data = {
    "data": [
      {
        "idAlumno": 1,
        "idHorario": 3
      },
      {
        "idAlumno": 1,
        "idHorario": 4
      }
    ]
  }
```

<span style="color:red">GET</span> http://localhost:3210/matricula **Devuelve las matrículas de un alumno de los horarios que están activos o en curso**

```javascript
  data = {
    idAlumno
  }
```

<span style="color:red">GET</span> http://localhost:3210/fichanota/finalizado **Devuelve los horarios en estado <span style="color:green">finalizado</span>, el curso, los temas y las notas en cada tema POR ALUMNO**

```javascript
  data = {
    idAlumno
  }
```