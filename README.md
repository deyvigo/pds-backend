### Instrucciones
```bash
npm install
npm run dev
```

### En las operaciones que requieren estar logeado
```js
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'mode': 'cors'
  }
```

### Administrador

<span style="color:red">POST</span> http://localhost:3210/login/profesor **Inicia sesion**

```javascript
  data = {
    username, 
    password
  }
```

<span style="color:red">GET</span> http://localhost:3210/profesor **Obtiene TODOS los profesores**

<span style="color:red">GET</span> http://localhost:3210/curso **Obtiene TODOS los cursos**

<span style="color:red">GET</span> http://localhost:3210/alumno **Obtiene TODOS los estudiantes**

<span style="color:red">GET</span> http://localhost:3210/tema **Obtiene TODOS los temas POR CURSO**

```javascript
  data = {
    idCurso
  }
```

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

## FALTA
<span style="color:red">POST</span> http://localhost:3210/fichanota **Guarda las notas**

### Alumno

