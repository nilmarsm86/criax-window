/**
 * Este es el paquete se trabaja la manipulacion de los datos de la bd
 * 
 * DBAL EXECUTE
 * <br />
 * <code>var conn = {name:'persona',path:'/home/bomby/CriaxProyects/persistencia',driver:'sqlite'};</code>
 * <br />
 * <code>var dbal = new cormx.dbal.DriverManager(conn);</code>
 * <br />
 * <code>dbal.getConnection(cormx.dbal.driver.Sqlite);</code>
 * <br />
 * <code>var qb = new cormx.builder.QueryBuilder();</code>
 * <br />
 * <code>dbal.prepare("select * from persona");</code>
 * <br />
 * <code>var resultado = dbal.execute();</code>
 * <br />            
 * <code>qb.setTables('persona')</code>
 * <br />
 * <code>  .select();</code>
 * <br />
 * <code>dbal.prepare(qb);</code>
 * <br />
 * <code>var resultado1 = dbal.execute();</code>
 * <br />
 *           
 * DBAL INSERT
 * <br />
 * <code>var conn = {name:'persona',path:'/home/bomby/CriaxProyects/persistencia',driver:'sqlite'};</code>
 * <br />
 * <code>var dbal = new cormx.dbal.DriverManager(conn);</code>
 * <br />
 * <code>dbal.getConnection(cormx.dbal.driver.Sqlite);</code>
 * <br />
 * <code>var qb = new cormx.builder.QueryBuilder();</code>
 * <br />
 * <code>dbal.prepare("insert into persona ('nombre', 'edad', 'id_carro') values ('abel','28','1')");</code>
 * <br />
 * <code>var resultado = dbal.execute();</code>
 * <br />           
 * <code>qb.setTables('persona')</code>
 * <br />
 * <code>  .setColumns(['nombre','edad','id_carro'])</code>
 * <br />
 * <code>  .insert(['{n}','{e}','{c}']);</code>
 * <br />
 * <code>dbal.prepare(qb)</code>
 * <br />
 * <code>    .bindValue('n','aldx')</code>
 * <br />
 * <code>    .bindValue('e',25)</code>
 * <br />
 * <code>    .bindValue('c',2);</code>
 * <br />
 * <code>var resultado1 = dbal.execute();</code>
 * <br />           
 * DBAL UPDATE
 * <br />
 * <code>var conn = {name:'persona',path:'/home/bomby/CriaxProyects/persistencia',driver:'sqlite'};</code>
 * <br />
 * <code>var dbal = new cormx.dbal.DriverManager(conn);</code>
 * <br />
 * <code>dbal.getConnection(cormx.dbal.driver.Sqlite);</code>
 * <br />
 * <code>var qb = new cormx.builder.QueryBuilder();</code>
 * <br />
 * <code>dbal.prepare("update persona set nombre='nilmar', id_carro='3' where id='4'");</code>
 * <br />
 * <code>dbal.execute();</code>
 * <br />           
 * <code>qb.setTables('persona')</code>
 * <br />
 * <code>  .setColumns(['nombre','id_carro']) </code>
 * <br />
 * <code>  .update(['{n}','{c}'])</code>
 * <br />
 * <code>  .addWhere('id',4);</code>
 * <br />
 * <code>dbal.prepare(qb)</code>
 * <br />
 * <code>    .bindValue('n','nilmar')</code>
 * <br />
 * <code>    .bindValue('c',2);</code>
 * <br />
 * <code>var resultado1 = dbal.execute();</code>
 * <br />           
 * DBAL DELETE
 * <br />
 * <code>var conn = {name:'persona',path:'/home/bomby/CriaxProyects/persistencia',driver:'sqlite'};</code>
 * <br />
 * <code>var dbal = new cormx.dbal.DriverManager(conn);</code>
 * <br />
 * <code>dbal.getConnection(cormx.dbal.driver.Sqlite);</code>
 * <br />
 * <code>var qb = new cormx.builder.QueryBuilder();</code>
 * <br />
 * <code>dbal.prepare("delete from persona where id='15'");</code>
 * <br />
 * <code>dbal.execute();</code>
 * <br />           
 * <code>qb.setTables('persona')</code>
 * <br />
 * <code>  .remove('id','{id}');</code>
 * <br />
 * <code>dbal.prepare(qb)</code>
 * <br />
 * <code>    .bindValue('id',14);</code>
 * <br />
 * <code>var resultado1 = dbal.execute();</code>
 * <br />
 * ENTITY MANAGER
 * <br />
 * PERSIST
 * <br />
 * <code>var dic = qx.criax.dic.DiContainer.getInstance();</code>
 * <br />
 * <code>var em = dic.get("entityManager");</code>
 * <br />            
 * <code>var entity = new persistencia.entity.Persona();</code>
 * <br />
 * <code>entity.setNombre('jenisley');</code>
 * <br />
 * <code>entity.setEdad(29);</code>
 * <br />           
 * <code>var entity2 = new persistencia.entity.Persona();</code>
 * <br />
 * <code>entity2.setId(15);</code>
 * <br />
 * <code>entity2.setNombre('reinaldo');</code>
 * <br />
 * <code>entity2.setEdad(24);</code>
 * <br />           
 * <code>em.persist(entity);</code>
 * <br />
 * <code>em.persist(entity2);</code>
 * <br />
 * <code>em.flush();</code>
 * <br />           
 * REMOVE
 * <br />
 * <code>var dic = qx.criax.dic.DiContainer.getInstance();</code>
 * <br />
 * <code>var em = dic.get("entityManager");</code>
 * <br />           
 * <code>var entity = new persistencia.entity.Persona();</code>
 * <br />
 * <code>entity.setId(44);</code>
 * <br />
 * <code>entity.setNombre('jeny');</code>
 * <br />
 * <code>entity.setEdad(29);</code>
 * <br />           
 * <code>em.remove(entity);</code>
 * <br />
 * <code>em.flush();</code>
 * <br />           
 * FINDER
 * <br />
 * <code>var dic = qx.criax.dic.DiContainer.getInstance();</code>
 * <br />
 * <code>var em = dic.get("entityManager");</code>            
 * <br />
 * <code>var finder = em.getFinder(persistencia.entity.Persona);</code>
 * <br />
 *           
 * FIND BY ID
 * <br />
 * <code>var dic = qx.criax.dic.DiContainer.getInstance();</code>
 * <br />
 * <code>var em = dic.get("entityManager");</code>            
 * <br />
 * <code>var persona = em.find(persistencia.entity.Persona,5);</code>
 * <br />           
 * FIND ALL
 * <br />
 * <code>var dic = qx.criax.dic.DiContainer.getInstance();</code>
 * <br />
 * <code>var em = dic.get("entityManager");</code>
 * <br />
 * <code>var personas = em.all(persistencia.entity.Persona);</code>
 *           
 * <br />
 * UNIT OF WORK
 * <br />
 * INSERT
 * <br />
 * <code>var uow = cormx.opm.UnitOfWork.getInstance();</code>
 * <br />
 * <code>uow.init();</code>
 * <br />
 * <code>uow.persistence(entity);</code>
 * <br />
 * <code>uow.commit();</code>
 * <br />           
 * BAD UPADTE
 * <br />
 * <code>var uow = cormx.opm.UnitOfWork.getInstance();</code>
 * <br />
 * <code>uow.init();</code>
 * <br />
 * <code>uow.registerRemoved(entity);</code>
 * <br />           
 * <code>var error = true;</code>
 * <br />
 * <code>try{</code>
 * <br />
 * <code>uow.persistence(entity);//funcion que lanza la excepcion</code>
 * <br />
 * <code>}catch(message){</code>
 * <br />
 * <code>error = false;</code>
 * <br />
 * <code>}finally{</code>
 * <br />
 * <code>uow.commit();</code>
 * <br />
 * <code>}</code>
 * <br />         
 * REGISTER REMOVE
 * <br />
 * <code>var uow = cormx.opm.UnitOfWork.getInstance();</code>
 * <br />
 * <code>uow.init();</code>
 * <br />
 * <code>uow.registerRemoved(entity);</code>
 * <br />
 * <code>uow.commit();</code>
 * <br />           
 * SEVERAL
 * <br />
 * <code>var uow = cormx.opm.UnitOfWork.getInstance();</code>
 * <br />
 * <code>uow.init()</code>
 * <br />
 * <code>   .persistence(entity1)</code>
 * <br />
 * <code>   .persistence(entity2)</code>
 * <br />
 * <code>   .registerRemoved(entity3)</code>
 * <br />
 * <code>   .commit();</code>
 *           
 *           
 */
