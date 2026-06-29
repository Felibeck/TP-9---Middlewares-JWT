# WatchGram

Clon informativo de Instagram cuyo contenido (posts, perfiles y avatares) gira en torno a fotos de relojes. El proyecto no busca replicar la red social entera: solo enrutamiento entre páginas y la apertura de un modal de publicación. El consumo de datos se hace contra la API de Unsplash mediante Axios, buscando fotos por palabra clave en lugar de tener un backend propio.

## Stack

React + TypeScript sobre Vite, enrutamiento con `react-router-dom`, y `axios` para las llamadas HTTP.

## Organización del proyecto

```
src/
  App.tsx              -> Página principal (feed)
  Profile.tsx          -> Página de perfil
  main.tsx             -> Configuración de rutas
  services/
    unsplash.ts         -> Única función de acceso a la API
  types/
    post.ts
    usuario.ts
    comentarioType.ts
  components/
    SearchBar/
    Historia/
    Feed/
    Post/
    Perfil/
    ComentarioItem/
    PostDetalleModal/
```

Cada componente vive en su propia carpeta con dos archivos: `index.tsx` y un `.css` con su mismo nombre. Esta decisión busca que el CSS nunca quede "suelto" en un archivo global: cada componente es responsable de su propia apariencia, y `App.css` solo contiene el layout general de la página (cómo se distribuyen los bloques entre sí), nunca el estilo interno de un bloque particular.

## Componentes y responsabilidad de cada uno

**SearchBar**: input de búsqueda con ícono de lupa en SVG. No tiene lógica, es puramente presentacional; existe como componente propio porque aparece igual en `App.tsx` y en `Profile.tsx`, y duplicar ese markup en ambas páginas hubiera violado DRY.

**Historia**: representa el círculo de una story (foto + username). Solo recibe los datos y los pinta. Se separó del feed principal porque la lista de historias se itera (`historias.map`) y cada item necesita ser una unidad reutilizable e independiente.

**Post**: tarjeta de una publicación individual dentro del grid del feed. Muestra la foto, los íconos de acción (like, comentario, compartir) y maneja su propio estado de "me gusta". Se le agregó la prop opcional `mostrarHeader` para poder ocultar el encabezado de usuario cuando el mismo componente se reutiliza dentro de la grilla de `Perfil` (donde, según el diseño de referencia, los posts no repiten el nombre de usuario arriba de cada foto). Esto evitó crear un segundo componente casi idéntico solo para esa diferencia visual.

**Feed**: recibe un array de posts y los renderiza envolviendo cada uno en un `Post`. Es el único responsable de transformar una lista de datos en una grilla, y de notificar hacia arriba (mediante callback) cuándo el usuario hizo click en una publicación. Separarlo de `Post` permite que el grid (columnas, gap) se controle en un solo lugar sin mezclar esa lógica con la tarjeta individual.

**Perfil**: bloque de cabecera de la página de perfil (foto grande, nombre, check de verificado, biografía y estadísticas de seguidores/seguidos). Se aisló del resto de `Profile.tsx` porque agrupa datos que siempre viajan juntos (el objeto `Usuario`) y porque, a diferencia del feed, no se repite ni se itera: tiene sentido como bloque único y nombrado.

**ComentarioItem**: una fila de comentario dentro del modal (avatar, username, mensaje y cantidad de likes). Se separó porque, igual que `Historia`, se itera dentro de una lista (los comentarios ficticios del post ampliado), y cada fila necesita ser una unidad independiente y reutilizable.

**PostDetalleModal**: el modal de publicación ampliada. Muestra la foto en grande, la lista de `ComentarioItem` y un textarea para "escribir un comentario" (sin funcionalidad de envío real, ya que el alcance del proyecto es informativo). Es un componente separado porque su ciclo de vida es distinto al resto: aparece y desaparece condicionalmente, y necesita lógica propia de overlay/cierre que no tiene sentido mezclar con `Feed` o `Post`.

## Por qué se componentizó de esta manera

El criterio general fue: si un bloque de UI se repite (se itera en un `.map`) o si agrupa datos que siempre se usan juntos y tienen una sola responsabilidad visual, se convierte en componente propio con su CSS aislado. Esto se aplicó de forma consistente en `Historia`, `Post` y `ComentarioItem` (los tres se iteran dentro de listas), mientras que `Perfil` y `PostDetalleModal` se separaron por agrupar una unidad de datos con un propósito visual único, no por repetirse. `SearchBar` se separó por reutilización entre páginas. Esta división evita que `App.tsx` y `Profile.tsx` terminen siendo archivos gigantes con todo el markup mezclado, y permite tocar el estilo de una pieza (por ejemplo, el corazón de like) sin riesgo de romper estilos de otras partes del feed.

## Comunicación entre componentes (props)

Toda la comunicación es unidireccional, de padre a hijo, mediante props, sin estado global ni Context:

- `App.tsx` y `Profile.tsx` obtienen los datos crudos de la API y los transforman al tipo `PostType` / `Usuario` antes de pasarlos hacia abajo.
- `Feed` recibe `listaPosts: PostType[]` y `onPostClick: (post: PostType) => void`. Esta segunda prop es una función callback: permite que `Feed` avise a su padre qué post fue clickeado sin que `Feed` necesite saber qué hacer con esa información (abrir un modal es decisión de quien lo contiene).
- `Post` recibe `post: PostType` y la prop opcional `mostrarHeader`. Al ser opcional con valor por defecto (`mostrarHeader = true`), `Post` puede usarse igual en el feed principal y en el perfil sin que ambos llamadores necesiten saber del detalle interno del otro.
- `Historia` recibe `fotoPerfil` y `username` sueltos (tipo `usuarioHistoria`), ya que no necesita el resto de los datos de un `Usuario` completo.
- `Perfil` recibe el objeto `usuario: Usuario` completo, porque todos sus campos se muestran en el mismo bloque.
- `ComentarioItem` recibe `msj`, `cantLikes` y `user` (este último parcial, `Partial<Usuario>`, ya que los comentarios ficticios no necesitan todos los campos de un usuario real).
- `PostDetalleModal` recibe `post: PostType` y `onClose: () => void`, otro ejemplo de callback: el modal no decide cómo se cierra él mismo (no maneja el estado de "qué post está abierto"), solo avisa que el usuario pidió cerrarlo.

Ningún componente hijo modifica directamente el estado del padre: todo cambio de estado que afecta a un componente superior se hace a través de funciones que el padre define y pasa como prop (callback props), patrón estándar en React para mantener el flujo de datos predecible.

## Hooks utilizados

- **`useState`**: usado en `App.tsx` y `Profile.tsx` para guardar los posts e historias obtenidos de la API (`posts`, `historias`) y cuál post está actualmente seleccionado para el modal (`postSeleccionado`). También se usa dentro de `Post` para manejar el estado local de "me gusta" (`liked`), ya que ese dato no necesita viajar fuera del propio componente ni persistir entre renders del padre.
- **`useEffect`**: usado en `App.tsx` y `Profile.tsx` para disparar las llamadas a la API de Unsplash apenas se monta el componente (dependencias `[]`), ya que se trata de un efecto de sincronización con un sistema externo (fetch de datos) que no debe ejecutarse en cada render sino una sola vez al cargar la página.

No se usaron hooks de Context, reducers ni librerías de manejo de estado externas: dado que la app no requiere compartir estado entre ramas alejadas del árbol de componentes (todo el estado relevante vive en la página que lo consume y baja por props), `useState` y `useEffect` fueron suficientes.

## Diseño de Figma utilizado como referencia

Se utilizó como referencia visual el archivo de Figma *"Instagram Modern Web Design — Community"*, adaptando la paleta de colores y disposición de bloques (header con buscador centrado, fila de stories, perfil lateral, grilla de posts y modal de publicación ampliada) al contenido temático de relojes de lujo que define a WatchGram.

## Visualización individual de publicaciones

Se resolvió mediante un modal controlado por estado, no por una ruta nueva. El estado `postSeleccionado` (tipo `PostType | null`) vive en el componente de página (`App.tsx` / `Profile.tsx`). Cuando es `null`, el modal no se renderiza; cuando contiene un post, `PostDetalleModal` se monta mostrando esa publicación. El click en cualquier tarjeta del `Feed` dispara `onPostClick`, que internamente llama a `setPostSeleccionado(post)`. Dentro del modal, el botón de cierre (✕) y el click en el fondo oscuro (overlay) llaman a `onClose`, que el padre resuelve haciendo `setPostSeleccionado(null)`. Se eligió este enfoque en lugar de una ruta dedicada porque el modal debe poder abrirse desde cualquier punto del feed sin perder el scroll ni el estado de la página de fondo, comportamiento típico de Instagram.

## Simulación del perfil de usuario logueado

Como el proyecto no tiene autenticación real, se simula tomando el usuario del primer resultado devuelto por la búsqueda de posts de relojes (`posts[0].usuario`) para mostrarlo como la cuenta dueña del feed (foto, nombre y username en la barra lateral, con link a `/profile`). En la página de perfil, en cambio, se hace una llamada separada pidiendo una sola foto de perfil genérica a la API, y con esos datos del usuario se simulan campos que Unsplash no provee de forma directa (biografía, cantidad de seguidores/seguidos), usando valores por defecto cuando la API no los trae.

## Datos mostrados en el perfil

Foto de perfil grande con borde de color (estética de "story" de Instagram), nombre completo con ícono de cuenta verificada, username precedido de `@`, biografía entre comillas en cursiva, y estadísticas de seguidores y seguidos en una misma fila. La cantidad de publicaciones no se muestra como dato suelto en esa fila, replicando el conteo y orden de información del diseño de Figma de referencia. Debajo de ese bloque se lista la grilla de posts del usuario (5 fotos de relojes), reutilizando `Feed` y `Post` con `mostrarHeader={false}` para no repetir el nombre de usuario en cada tarjeta.

## Estados para selección de publicaciones y vista individual

- `posts: PostType[]` y `historias: usuarioHistoria[]` (o `Usuario | null` en el caso del perfil): guardan los datos ya transformados que llegan de la API, listos para ser iterados por `Feed` e `Historia`.
- `postSeleccionado: PostType | null`: es el estado central de la vista individual. Su valor (`null` o un post concreto) determina si el modal está montado o no, evitando manejar visibilidad con clases CSS condicionales y manteniendo en un solo lugar la fuente de verdad de "qué se está mostrando en grande ahora".
- `liked: boolean` (estado local dentro de `Post`): controla únicamente el color del ícono de corazón de esa tarjeta puntual. Se mantiene local y no se sube a la página porque ningún otro componente necesita saber si un post individual fue likeado.

## Figma: https://www.figma.com/design/46XCp3RKgRfBCbbAUjsbuw/%C4%B0nstagram-Modern-Web-Design--Community-?node-id=0-1&t=VxqBbvL9pcPscBuZ-1