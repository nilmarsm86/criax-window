/**
 * Este es el paquete se encuentran las clases para las clausulas sql en la
 * construccion de la sintaxis de las consultas
 * 
 * <h3>INSERT</h3>
 * <code>var insert = new cormx.builder.InsertBuilder("usuario");</code>
 * <br />
 * <code>insert.setColumns(['nombre','edad']);</code>
 * <code>insert.setValues(['nilmar',25]);</code>
 * <code>var result = insert.generate();</code>
 * 
 * <code>INSERT INTO usuario ('nombre', 'edad') VALUES ('nilmar', '25')</code>
 * 
 * <h3>DELETE</h3>
 * <code>var remove = new cormx.builder.DeleteBuilder("usuario");</code>
 * <br />
 * <code>var result = remove.generate();</code>
 * <br />          
 * <code>DELETE FROM usuario</code>
 * 
 * <h3>DELETE WHERE</h3>
 * <code>var remove = new cormx.builder.DeleteBuilder("usuario");</code>
 * <br />
 * <code>remove.addConditions("id",5);</code>
 * <br />
 * <code>var result = remove.generate();</code>
 * <br />          
 * <code>DELETE FROM usuario WHERE id = '5'</code>
 * 
 * <h3>DELETE LIKE AND IN</h3>
 * <code>var remove = new cormx.builder.DeleteBuilder("usuario");</code>
 * <br />
 * <code>remove.addConditions("id",5,"like","or");</code>
 * <br />
 * <code>remove.addConditions("nombre",'nilmar',"in");</code>
 * <br />
 * <code>var result = remove.generate();</code>
 * <br />          
 * <code>DELETE FROM usuario WHERE id LIKE '5' OR nombre IN 'nilmar'</code>
 * 
 * <h3>SELECT</h3>
 * 
 * <code>var select = new cormx.builder.SelectBuilder();<code>
 * <br />
 * <code>select.from("usuario");</code>
 * <br />
 * <code>var result = select.generate();</code>
 * <br />          
 * <code>SELECT * FROM usuario</code>
 * 
 * SELECT LIMIT
 * 
 * <code>var select = new cormx.builder.SelectBuilder();</code>
 * <br />
 * <code>select.from("usuario");</code>
 * <br />
 * <code>select.limit(2,5);</code>
 * <br />
 * <code>var result = select.generate();</code>
 * <br />          
 * <code>SELECT * FROM usuario LIMIT 5, 2</code>
 * 
 * SELECT WHERE,OR,OR
 * 
 * <code>var select = new cormx.builder.SelectBuilder();</code>
 * <br />
 * <code>select.from("usuario");</code>
 * <br />
 * <code>select.addWhere("id",2,"=");</code>
 * <br />
 * <code>select.addOr("nombre","Nilmar");</code>
 * <br />
 * <code>select.addOr("edad",25);</code>
 * <br />
 * <code>var result = select.generate();</code>
 * <br />          
 * <code>SELECT * FROM usuario WHERE id = '2' OR nombre = 'Nilmar' OR edad = '25'</code>
 */
