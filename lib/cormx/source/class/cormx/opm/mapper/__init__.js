/**
 * Este es el paquete se encuentran las clases para mapear de datos optenidos
 * en la bd a clases, propiedades, etc y viceversa
 * 
 * FINDER
 * <br />
 * <code>var mapper = persistencia.entity.mapper.PersonaMapper.getInstance();</code>
 * <br />
 * <code>mapper.init(entity);</code>
 * <br />
 * <code>var result = mapper.getFinder();</code>
 * <br />
 * IDENTITY
 * <br />
 * <code>var identityMap = persistencia.entity.im.PersonaIdentityMap.getInstance();</code>
 * <br />
 * <code>identityMap.set(entity,"getId");</code>
 * <br />          
 * <code>var mapper = persistencia.entity.mapper.PersonaMapper.getInstance();</code>
 * <br />
 * <code>mapper.init(entity);</code>
 * <br />           
 * <code>var result = mapper.searchInIdentityMap(1);</code>
 * <br />           
 * TABLE NAME
 * <br />
 * <code>var mapper = persistencia.entity.mapper.PersonaMapper.getInstance();</code>
 * <br />
 * <code>mapper.init(entity);</code>
 * <br />           
 * <code>var result = mapper.getTableName();</code>
 * <br />           
 * COLUMNS NAME
 * <br />
 * <code><code>var mapper = persistencia.entity.mapper.PersonaMapper.getInstance();</code>
 * <br />
 * <code>mapper.init(entity);</code>
 * <br />           
 * <code>var result = mapper.getColumnsName();</code>
 * <br />           
 * COLUMN ID
 * <br />
 * <code>var mapper = persistencia.entity.mapper.PersonaMapper.getInstance();</code>
 * <br />
 * <code>mapper.init(entity);</code>
 * <br />           
 * <code>var result = mapper.getColumnId();</code>
 * <br />           
 *  INSERT
 * <br />
 * <code>var mapper = persistencia.entity.mapper.PersonaMapper.getInstance();</code>
 * <br />
 * <code>mapper.init(entity);</code>
 * <br />
 * <code>mapper.insert(entity);</code>
 * <br />           
 *  UPDATE
 * <br />
 * <code>var mapper = persistencia.entity.mapper.PersonaMapper.getInstance();</code>
 * <br />
 * <code>mapper.init(entity);</code>
 * <br />
 * <code>mapper.update(entity);</code>
 * <br />           
 *  DELETE
 * <br />
 * <code>var mapper = persistencia.entity.mapper.PersonaMapper.getInstance();</code>
 * <br />
 * <code>mapper.init(entity);</code>
 * <br />
 * <code>mapper.remove(entity);</code>
 */
