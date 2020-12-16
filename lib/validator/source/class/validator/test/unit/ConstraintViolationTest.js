qx.Class.define("validator.test.unit.ConstraintViolationTest",
{
    extend :qx.dev.unit.TestCase,    
    
    properties :
    {
        __constrainViolation : {}
    },

    members :
    {
        setUp : function(){
            this.__constrainViolation = new validator.ConstraintViolation();  
            this.__constrainViolation.setMessage("Error");
        },
        
        testGetSimpleMessage : function(){
            var constrainViolation = new validator.ConstraintViolation("Error");
            var error = constrainViolation.getMessage();
            this.assertEquals("Error", error);
        },
        
        testGetSetterMessage : function(){            
            var error = this.__constrainViolation.getMessage();
            this.assertEquals("Error", error);
        },
        
        testEntityNamespace : function(){
            this.__constrainViolation.setEntityNamespace("package.Entity");
            var error = this.__constrainViolation.getMessage();
            this.assertEquals("package.Entity: Error", error);
        },
        
        testEntityMethod : function(){
            this.__constrainViolation.setEntityNamespace("package.Entity");
            this.__constrainViolation.setEntityMethod("execute");
            var error = this.__constrainViolation.getMessage();
            this.assertEquals("package.Entity.execute(): Error", error);
        },
        
        testEntityAttr : function(){
            this.__constrainViolation.setEntityNamespace("package.Entity");
            this.__constrainViolation.setEntityAttr("propiedad");
            var error = this.__constrainViolation.getMessage();
            this.assertEquals("package.Entity.propiedad: Error", error);
        },
        
        testEntityMethodError : function(){            
            this.__constrainViolation.setEntityMethod("execute");
            var error = this.__constrainViolation.getMessage();
            this.assertEquals("Error", error);
        },
        
        testEntityAttrError : function(){            
            this.__constrainViolation.setEntityAttr("propiedad");
            var error = this.__constrainViolation.getMessage();
            this.assertEquals("Error", error);
        }
    }
});