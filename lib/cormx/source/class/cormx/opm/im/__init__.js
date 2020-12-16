/**
 * Este es el paquete se encuentran las clases para mantener la informacion
 * de la bd en memoria y no tener que buscarla cada vez
 * 
 * PUSH IN IDENTITY MAP
 * <br />
 * <code>var entity = new persistencia.entity.Persona();</code>
 * <br />
 * <code>entity.setId(1);</code>
 * <br />
 * <code>entity.setNombre('nilmar');</code>
 * <br />
 * <code>entity.setEdad(25);</code>
 * <br />
 * <code>var im = persistencia.entity.im.PersonaIdentityMap.getInstance();</code>
 * <br />
 * <code>im.set(entity,"getId");</code>
 * <br />          
 * GET FROM IDENTITY MAP
 * <br />
 * <code>var im = persistencia.entity.im.PersonaIdentityMap.getInstance();</code>
 * <br />
 * <code>im.get(5)</code>
 */
