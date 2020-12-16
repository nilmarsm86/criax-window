qx.Class.define("validator.test.unit.constraints.TypeTest",
{
    extend :qx.dev.unit.TestCase,

    members :
    {
        testString : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.STRING);
            validation("string");
        },
        
        testStringConstructor : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.STRING);
            validation(String('a'));
        },
        
        testNotString : function(){
            var validation = validator.constraints.Type.validate("mal",validator.constraints.Type.STRING);
            this.assertException(function(){
                validation(7);
            },Error,"Validation Error: mal");
        },
        
        testNumberString : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.STRING);
            validation("147");
        },
        
        testObjectString : function(){
            var validation = validator.constraints.Type.validate("mal",validator.constraints.Type.STRING);
            this.assertException(function(){
                validation(new String('a'));
            },Error,"Validation Error: mal");
        },
        
        testNumber : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.NUMBER);
            validation(7);
        },
        
        testNumberConstructor : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.NUMBER);
            validation(Number(7));
        },
        
        testStringNumber : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.NUMBER);
            this.assertException(function(){
                validation("789");
            },Error,"Validation Error: Debe ser un n"+'\u00fa'+"mero!");
        },
        
        testObjectNumber : function(){
            var validation = validator.constraints.Type.validate("mal",validator.constraints.Type.NUMBER);
            this.assertException(function(){
                validation(new Number(7));
            },Error,"Validation Error: mal");
        },
        
        testIsUndefined : function(){            
            var validation = validator.constraints.IsUndefined.validate();
            validation(undefined);            
        },
        
        testIsNotUndefined : function(){            
            var validation = validator.constraints.IsUndefined.validate();
            this.assertException(function(){
                validation("undefined");
            },Error,"Validation Error: Debe ser indefinido!");
        },
        
        testIsNull : function(){
            var validation = validator.constraints.IsNull.validate();
            validation(null);            
        },
        
        testIsNotNull : function(){            
            var validation = validator.constraints.IsNull.validate();
            this.assertException(function(){
                validation("null");
            },Error,"Validation Error: Debe ser nulo!");
        },
        
        testObject : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.OBJECT);
            validation({name:'nombre'});
        },
        
        testLiteralObject : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.OBJECT);
            validation(new Object());
        },
        
        testObjectConstructor : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.OBJECT);
            validation(Object());
        },
        
        testEmptyObject : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.OBJECT);
            validation({});
        },
        
        testNotObject : function(){
            var validation = validator.constraints.Type.validate("mal",validator.constraints.Type.OBJECT);
            this.assertException(function(){
                validation("{}");
            },Error,"Validation Error: mal");
        },
        
        testTrue : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.BOOLEAN);
            validation(true);
        },
        
        testBooleanConstructor : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.BOOLEAN);
            validation(Boolean('true'));
        },
        
        testFalse : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.BOOLEAN);
            validation(false);
        },
        
        testBooleanObject : function(){
            var validation = validator.constraints.Type.validate("mal",validator.constraints.Type.BOOLEAN);
            this.assertException(function(){
                validation(new Boolean(0));
            },Error,"Validation Error: mal");
        },
        
        testNotTrue : function(){
            var validation = validator.constraints.Type.validate("mal",validator.constraints.Type.BOOLEAN);
            this.assertException(function(){
                validation("true");
            },Error,"Validation Error: mal");
        },
        
        testNotFalse : function(){
            var validation = validator.constraints.Type.validate("mal",validator.constraints.Type.BOOLEAN);
            this.assertException(function(){
                validation(0);
            },Error,"Validation Error: mal");
        },
        
        testFunction : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.FUNCTION);
            validation(function(){});
        },
        
        testFunctionConstructor : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.FUNCTION);
            validation(Function());
        },
        
        testFunctionObject : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.FUNCTION);
            validation(new Function());
        },
        
        testArray : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.ARRAY);
            validation([]);
        },
        
        testArrayConstructor : function(){
            //this.skip(); el arrego siempre es un objeto
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.ARRAY);
            validation(Array('1'));
        },
        
        testArrayObject : function(){
            //this.skip(); el arrego siempre es un objeto
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.ARRAY);
            validation(new Array('1'));
        },
        
        testRegExp : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.REGEXP);
            validation(/^(ab)$/);
        },
        
        testRegExpObject : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.REGEXP);
            validation(new RegExp('^(ab)$'));
        },
        
        testError : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.ERROR);
            validation(Error());
        },
        
        testErrorObject : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.ERROR);
            validation(new Error());
        },
        
        testErrorChield : function(){
            var validation = validator.constraints.Type.validate("",validator.constraints.Type.ERROR);
            validation(new qx.core.ValidationError("Validation Error", 'error'));
        },
        
        testTypeNotAccept : function(){
            var validation = validator.constraints.Type.validate("mal","name");
            this.assertException(function(){
                validation('pepe');
            },Error,"Validation Error: El tipo de dato name no existe!");
        },
        
        testDate : function(){
            var validation = validator.constraints.Date.validate();
            validation(new Date());
        },
        
        testDateConstructor : function(){            
            var validation = validator.constraints.Date.validate("es un string");            
            this.assertException(function(){
                validation(Date());
            },Error,"Validation Error: es un string");
        }
    }
});