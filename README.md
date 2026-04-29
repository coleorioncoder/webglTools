# webglTools
a library to help with some webGl graphics stuff, primarily with setting up shader programs, configuring buffers and displaying vertex data within a single object instance connected to a canvas element.

## Keywords

### WebGLStuffObj
The constructor for the webGL tool methods.

Syntax: 
var frameworkObj = new WebGLStuffObj(canvNode, glContextsArray*, canvWidth*, canvHeight*)

**Arguments:**
 * canvNode - the DOM node of the HTML canvas element to display graphics to 
 * glContextsArray* - optional array of webGL context strings to use when accquiring the webGL context for the canvas
 * canvWidth* - optional width of the resolution of the canvas
 * canvHeight* - optional height of the resolution of the canvas


###initShaderProgram
Method to take care of all of the stuff necessary in creating and compiling a webGL shader program

Syntax: 
frameworkObj.initShaderProgram(vsSource, fsSource)

**Arguments:**
 * vsSource - the vertex shader source code to use, in text format
 * fsSource - the fragment shader source code to use, in text format




