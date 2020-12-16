qx.Class.define("validator.test.unit.ValidatorTest",
{
    //in case to require CRIAX library extendes from criax.dev.unit.TestCase 
    extend :qx.dev.unit.TestCase,

    members :
    {
        testValidatePrimitiveData : function(){
            var v = new validator.Validator();
            var violations = v.validateValue("",validator.constraints.Letter.validate("Nombre vacio",true));
            this.assertEquals("Nombre vacio", violations[0].getMessage());
        },
        
        testValidateWithCallback : function(){
            var v = new validator.Validator();
            var violations = v.validateValue("",function(value){
                if(value.length == 0){
                    throw new qx.core.ValidationError("Validation Error", "Valor vacio");
                }
            });
            this.assertEquals("Valor vacio", violations[0].getMessage());
        },
        
        testValidateWithArray : function(){
            var v = new validator.Validator();
            var c = [];
            c.push(validator.constraints.Letter.validate("Nombre solo letras",true));
            c.push(validator.constraints.Email.validate("No es correo",true));
            var violations = v.validateValue(7,c);
            //this.assertEquals(2, violations.length);
            this.assertEquals("No es correo", violations[1].getMessage());
        },
        
        testAttrEntity : function(){
            var map = {};
            map.clazz = "validator.fixture.Author";
            map.fields = {};
            map.fields.name = {};
            map.fields.name.constraints = [];
            map.fields.name.constraints.push(validator.constraints.Letter.validate("Nombre solo letras",true));
            map.fields.name.constraints.push(validator.constraints.Email.validate("No es correo",true));
            
            var author = new validator.fixture.Author();
            author.name = 7;
            
            var v = new validator.Validator();
            var violations = v.validate(author,map);
            //this.assertEquals(2, violations.length);
            this.assertEquals("validator.fixture.Author.name: No es correo", violations[1].getMessage());            
        },
        
        testMethodEntity : function(){
            var map = {};
            map.clazz = "validator.fixture.Author";
            map.fields = {};            
            map.getters = {};
            map.getters.getEmail = {};
            map.getters.getEmail.constraints = [];
            map.getters.getEmail.constraints.push(validator.constraints.Letter.validate("Nombre solo letras",true));
            map.getters.getEmail.constraints.push(validator.constraints.Email.validate("No es correo",true));
            
            var author = new validator.fixture.Author();            
            
            var v = new validator.Validator();
            var violations = v.validate(author,map);            
            this.assertEquals("validator.fixture.Author.getEmail(): Nombre solo letras", violations[0].getMessage());            
        },
        
        testEntityAll : function(){
            var map = {};
            map.clazz = "validator.fixture.Author";
            map.fields = {};
            map.fields.name = {};
            map.fields.name.constraints = [];
            map.fields.name.constraints.push(validator.constraints.Letter.validate("Nombre solo letras",true));
            map.fields.name.constraints.push(validator.constraints.Email.validate("No es correo",true));
            map.getters = {};
            map.getters.getEmail = {};
            map.getters.getEmail.constraints = [];
            map.getters.getEmail.constraints.push(validator.constraints.Letter.validate("Nombre solo letras",true));
            map.getters.getEmail.constraints.push(validator.constraints.Email.validate("No es correo",true));
            
            var author = new validator.fixture.Author();
            author.name = 7;
            
            var v = new validator.Validator();
            var violations = v.validate(author,map);
            this.assertEquals(4, violations.length);
                        
        }
        
        //validar a partir del json de validators
    }
});