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

<span style="color:red">GET</span> http://localhost:3210/horario **Obtiene TODOS los horarios POR CURSO**

```javascript
  data = {
    idCurso
  }
```

<span style="color:red">PUT</span> http://localhost:3210/profesor/autorizar **Acepta cuenta de profesor**

```javascript
  data = {
    username, 
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
    requisito, // id_curso que es requisito
    idCreador // id_administrador que crea la cuenta
  }
```

<span style="color:red">POST</span> http://localhost:3210/horario **Crea un horario**

```javascript
  data = {
    dia, //lunes, martes ...
    estado, //inactivo, activo, en curso, finalizado
    horaInicio, // Formato: 24 horas HH:MM
    horaFinal,
    idProfesor, // profesor a cargo
    idCurso 
  }
```

<span style="color:red">PUT</span> http://localhost:3210/horario **Cambia el estado de un horario**

```javascript
  data = {
    idHorario,
    estado //inactivo, activo, en curso, finalizado
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