function WebGLStuffObj(canvasNode, contextStrings, canvasWidth, canvasHeight) {
    // this.canvasNode.width = canvasWidth ? canvasWidth : this.canvasNode.clientWidth;
    // this.canvasNode.height = canvasHeight ? canvasHeight : this.canvasNode.clientHeight;
    this.canvasNode = canvasNode;
    let gl = canvasNode.getContext(contextStrings[0] != null ? contextStrings[0] : "webgl");
    for (var i = 1; i < contextStrings.length; i++) {
        gl = gl||canvasNode.getContext(contextStrings[i]);
    }
    this.gl = gl;
    if (this.gl == null || this.gl === null || !this.gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    this.vs = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.fs = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.shaderProg = this.gl.createProgram();
    this.vertexBuff = this.gl.createBuffer();
    this.indexBuff = this.gl.createBuffer();
    this.bufferUsage = this.gl.STATIC_DRAW;
    this.vertexStride = 8*4; //defaults to 32, for 3 32bit floats for the coordinate, 1 32bit float for the size, and 4 32bit floats for the color, with 4 bytes per each, so 8*4 = 32
    this.vertices = [];
    this.indices = [];
    this.pointIndexCount = 0;
    this.lineIndexCount = 0;
    this.triangleIndexCount = 0;
}
// WebGLGraphicsObj.prototype.initShader = function(type, source) {
//     if (type.toLowerCase() == "vertex" || type.toLowerCase() == "vs" || type.toLowerCase() == "v") {
//         this.gl.shaderSource(this.vs, source);
//         this.gl.compileShader(this.vs);
//     } else if (type.toLowerCase() == "fragment" || type.toLowerCase() == "fs" || type.toLowerCase() == "f") {
//         this.gl.shaderSource(this.fs, source);
//         this.gl.compileShader(this.fs);
//     } else {
        
//     }
// }
WebGLStuffObj.prototype.initShaderProgram = function (vsSourceParam, fsSourceParam) {
    // let vs = this.gl.createShader(this.gl.VERTEX_SHADER);
    // let fs = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    //let shaderProg = this.gl.createProgram();
    //this.shaderProg = this.gl.createProgram();
    this.gl.shaderSource(this.vs, vsSourceParam);
    this.gl.shaderSource(this.fs, fsSourceParam);
    this.gl.compileShader(this.vs);
    this.gl.compileShader(this.fs);
    this.gl.attachShader(this.shaderProg, this.vs);
    this.gl.attachShader(this.shaderProg, this.fs);
    this.gl.linkProgram(this.shaderProg);
    if (!this.gl.getProgramParameter(this.shaderProg, this.gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program: "+this.gl.getProgramInfoLog(this.shaderProg)+"\nvs info log: "+this.gl.getShaderInfoLog(this.vs)+"\nfs info log: "+this.gl.getShaderInfoLog(this.fs));
        //console.log("Unable to initialize the shader program: "+this.gl.getProgramInfoLog(this.shaderProg)+"\nvs info log: "+this.gl.getShaderInfoLog(this.vs)+"\nfs info log: "+this.gl.getShaderInfoLog(this.fs));
        this.gl.deleteProgram(this.shaderProg);
        //return retVal;
    }
}
WebGLStuffObj.prototype.initBuffer = function (buffer, data, usage) {
    if (buffer.toLowerCase() == "vertexbuffer" || buffer.toLowerCase() == "vertexbuff" || buffer.toLowerCase() == "vbuffer" || buffer.toLowerCase() == "vbuff" || buffer.toLowerCase() == "vb" || buffer.toLowerCase() == "v") {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuff);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.bufferUsage);
    } else if (buffer.toLowerCase() == "indexbuffer" || buffer.toLowerCase() == "indexbuff" || buffer.toLowerCase() == "indbuff" || buffer.toLowerCase() == "indbuffer" || buffer.toLowerCase() == "ibuff" || buffer.toLowerCase() == "ib" || buffer.toLowerCase() == "i") {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexBuff);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, data, this.bufferUsage);
    }
}
WebGLStuffObj.prototype.initBuffers = function (dataObjParam, vStride) {
    //let vertices = [];
    //let indices = [];
    let dataObjFormat = dataObjParam.vertices != null ? "vertex" : "shape";
    let vertexStride = vStride ?? this.vertexStride;
    if (dataObjFormat == "vertex") {
        let pointIndexMap = [];
        let lineIndexMap = [];
        let triangleIndexMap = [];
        
        // dataObjParam.points.forEach((el) => {
        //     if (!pointIndexMap.some((el2) => el2[0] == el)) {
        //         for (let j = 0; j < vertexStride; j++) {
        //             dataObj.pointVertices.push(dataObjParam.vertices[(el*vertexStride)+j]);
        //         }
        //         pointIndexMap.push([el, floor(dataObj.pointVertices.length / vertexStride)-1]);
        //     }
        //     dataObj.pointIndices.push(pointIndexMap.find((el2) => el2[0] == el)[1]);
        // });
        // dataObjParam.lines.forEach((el) => {
        //     if (!lineIndexMap.some((el2) => el2[0] == el)) {
        //         for (let j = 0; j < vertexStride; j++) {
        //             dataObj.lineVertices.push(dataObjParam.vertices[(el*vertexStride)+j]);
        //         }
        //         lineIndexMap.push([el, floor(dataObj.lineVertices.length / vertexStride)-1]);
        //     }
        //     dataObj.lineIndices.push(lineIndexMap.find((el2) => el2[0] == el)[1]);
        // });
        // dataObjParam.triangles.forEach((el) => {
        //     if (!triangleIndexMap.some((el2) => el2[0] == el)) {
        //         for (let j = 0; j < vertexStride; j++) {
        //             dataObj.triangleVertices.push(dataObjParam.vertices[(el*vertexStride)+j]);
        //         }
        //         triangleIndexMap.push([el, floor(dataObj.triangleVertices.length / vertexStride)-1]);
        //     }
        //     dataObj.triangleIndices.push(triangleIndexMap.find((el2) => el2[0] == el)[1]);
        // });
        // for (let i = 0; i < dataObjParam.points.length; i ++) {
        //     let currInd = dataObjParam.points[i];
        //     if (!pointIndexMap.some((el) => el[0] == currInd)) {
        //         for (let j = 0; j < vertexStride; j++) {
        //             dataObj.pointVertices.push(dataObjParam.vertices[(currInd*vertexStride)+j]);
        //         }
        //         pointIndexMap.push([currInd, floor(dataObj.pointVertices.length / vertexStride)-1]);
        //     }
        //     dataObj.pointIndices.push(pointIndexMap.find((el) => el[0] == currInd)[1]);
        // }
        // for (let i = 0; i < dataObjParam.lines.length; i ++) {
        //     let currInd = dataObjParam.lines[i];
        //     if (!lineIndexMap.some((el) => el[0] == currInd)) {
        //         for (let j = 0; j < vertexStride; j++) {
        //             dataObj.lineVertices.push(dataObjParam.vertices[(currInd*vertexStride)+j]);
        //         }
        //         lineIndexMap.push([currInd, floor(dataObj.lineVertices.length / vertexStride)-1]);
        //     }
        //     dataObj.lineIndices.push(lineIndexMap.find((el) => el[0] == currInd)[1]);
        // }
        // for (let i = 0; i < dataObjParam.triangles.length; i ++) {
        //     let currInd = dataObjParam.triangles[i];
        //     if (!triangleIndexMap.some((el) => el[0] == currInd)) {
        //         for (let j = 0; j < vertexStride; j++) {
        //             dataObj.triangleVertices.push(dataObjParam.vertices[(currInd*vertexStride)+j]);
        //         }
        //         triangleIndexMap.push([currInd, floor(dataObj.triangleVertices.length / vertexStride)-1]);
        //     }
        //     dataObj.triangleIndices.push(triangleIndexMap.find((el) => el[0] == currInd)[1]);
        // }
        this.vertices = dataObjParam.vertices;
        this.pointIndexCount = dataObjParam.points.length;
        this.lineIndexCount = dataObjParam.lines.length;
        this.triangleIndexCount = dataObjParam.triangles.length;
    
        dataObjParam.points.forEach((el) => this.indices.push(el));
        dataObjParam.lines.forEach((el) => this.indices.push(el));
        dataObjParam.triangles.forEach((el) => this.indices.push(el));
        
        // dataObj.pointVertices = dataObjParam.points.flatMap((el, ind, arr) => {
        //     return dataObjParam.vertices.copyWithin(el*7, el*7, (el*7)+6);
        // });
        // dataObj.pointIndices = dataObjParam.points;
    } else if (dataObjFormat == "shape") {
        let pointIndices = [];
        let lineIndices = [];
        let triangleIndices = [];
        dataObjParam.points.vertices.forEach((el) => this.vertices.push(el));
        //this.vertices.push(dataObjParam.points.vertices);
        pointIndices = dataObjParam.points.indices;
        //dataObj.vertices.flat(1);
        lineIndices = dataObjParam.lines.indices.map((x) => x+Math.floor(this.vertices.length/vertexStride));
        //dataObj.vertices.push(dataObjParam.lines.vertices);
        dataObjParam.lines.vertices.forEach((el) => this.vertices.push(el));
        //dataObj.vertices.flat(1);
        triangleIndices = dataObjParam.triangles.indices.map((x) => x+Math.floor(this.vertices.length/vertexStride));
        //dataObj.vertices.push(dataObjParam.triangles.vertices);
        dataObjParam.triangles.vertices.forEach((el) => this.vertices.push(el));
        //dataObj.vertices.flat(1);
        
        // dataObj.indices.push(pointIndices);
        // dataObj.indices.push(lineIndices);
        // dataObj.indices.push(triangleIndices);
        // dataObj.indices.flat(1);
        pointIndices.forEach((el) => this.indices.push(el));
        lineIndices.forEach((el) => this.indices.push(el));
        triangleIndices.forEach((el) => this.indices.push(el));
        this.pointIndexCount = pointIndices.length;
        this.lineIndexCount = lineIndices.length;
        this.triangleIndexCount = triangleIndices.length;
    }
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuff);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.bufferUsage);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuff);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.bufferUsage);
}
WebGLStuffObj.prototype.updateBuffers = function (bufferUsageParam) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuff);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.bufferUsage);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuff);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.bufferUsage);
}
WebGLStuffObj.prototype.addVertex = function (vArray) {
    if (vArray.length == this.vertexStride/4) {
        vArray.forEach((el) => this.vertices.push(el));
        let vertexCount = this.vertices.length/(this.vertexStride/4);
        return (this.vertices.length*4/this.vertexStride)-1;
    } else {
        return -1;
    }
}
WebGLStuffObj.prototype.addPoint = function (pointIndex) {
    let points = this.indices.filter((el, ind, arr) => ind < this.pointIndexCount);
    let otherIndices = this.indices.filter((el, ind, arr) => ind >= this.pointIndexCount);
    if (pointIndex < this.vertices.length/(this.vertexStride/4) && pointIndex >= 0) {
        points.push(pointIndex);
        this.pointIndexCount++;
        this.indices = points;
        otherIndices.forEach((el) => this.indices.push(el));
        return "successfully added point";
    } else {
        return "Failed to add point: index out of bounds.";
    }
}
WebGLStuffObj.prototype.addLine = function (lineInd1, lineInd2) {
    let pointLineIndices = this.indices.filter((el, ind, arr) => ind < this.pointIndexCount+this.lineIndexCount);
    let triangleIndices = this.indices.filter((el, ind, arr) => ind >= this.pointIndexCount+this.lineIndexCount);
    if (lineInd1 < this.vertices.length/(this.vertexStride/4) && lineInd1 >= 0 && lineInd2 < this.vertices.length/(this.vertexStride/4) && lineInd2 >= 0) {
        pointLineIndices.push(lineInd1, lineInd2);
        this.lineIndexCount+=2;
        this.indices = pointLineIndices;
        triangleIndices.forEach((el) => this.indices.push(el));
        return "successfully added line";
    } else {
        return "Failed to add point: index out of bounds.";
    }
}
WebGLStuffObj.prototype.addTriangle = function (triInd1, triInd2, triInd3) {
    if (triInd1 < this.vertices.length/(this.vertexStride/4) && triInd1 >= 0 && triInd2 < this.vertices.length/(this.vertexStride/4) && triInd2 >= 0 && triInd3 < this.vertices.length/(this.vertexStride/4) && triInd3 >= 0) {
        this.indices.push(triInd1, triInd2, triInd3);
        this.triangleIndexCount+=3;
    }
}
WebGLStuffObj.prototype.setupCanvas = function (canvasWidth, canvasHeight, bColorArray, cullFaceParam) {
    let cullFace = cullFaceParam != null ? cullFaceParam : true;
    this.canvasNode.width = canvasWidth ? canvasWidth : this.canvasNode.clientWidth;
    this.canvasNode.height = canvasHeight ? canvasHeight : this.canvasNode.clientHeight;
    //set canvas viewport and background color and depth, and clear canvas with them
    this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    this.gl.clearColor(bColorArray[0], bColorArray[1], bColorArray[2], bColorArray[3]);
    this.gl.clearDepth(1.0); // Clear everything
    this.gl.enable(this.gl.DEPTH_TEST); // Enable depth testing
    this.gl.depthFunc(this.gl.LEQUAL); // Near things obscure far things
    this.gl.enable(this.gl.BLEND);
    //set blending to create transparency
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    if (cullFace) {
        this.gl.enable(this.gl.CULL_FACE);
    }
    this.gl.frontFace(this.gl.CCW);
    
    this.gl.cullFace(this.gl.BACK);//don't render faces that aren't visible
    this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);
}
WebGLStuffObj.prototype.initAttributes = function (vertexAttribPointerArray) {
    this.vertexStride = vertexAttribPointerArray[0][4];
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuff);
    for (var i = 0; i < vertexAttribPointerArray.length; i++) {
        let vAttribLoc = this.gl.getAttribLocation(this.shaderProg, vertexAttribPointerArray[i][0]);
        let vAttribType = vertexAttribPointerArray[i][2].toUpperCase() == "BYTE" ? this.gl.BYTE : vertexAttribPointerArray[i][2].toUpperCase() == "SHORT" ? this.gl.SHORT : vertexAttribPointerArray[i][2].toUpperCase() == "UNSIGNED_BYTE" ? this.gl.UNSIGNED_BYTE : vertexAttribPointerArray[i][2].toUpperCase() == "UNSIGNED_SHORT" ? this.gl.UNSIGNED_SHORT : vertexAttribPointerArray[i][2].toUpperCase() == "FLOAT" ? this.gl.FLOAT : this.gl.FLOAT; 
        this.gl.vertexAttribPointer(vAttribLoc, vertexAttribPointerArray[i][1], vAttribType, vertexAttribPointerArray[i][3], vertexAttribPointerArray[i][4], vertexAttribPointerArray[i][5]);
        this.gl.enableVertexAttribArray(vAttribLoc);
    }
}
WebGLStuffObj.prototype.initUniforms = function (uniformInitFunc) {
    //this.gl.useProgram(this.shaderProg);
    if (this.gl.getParameter(this.gl.CURRENT_PROGRAM) == null) {
        this.gl.useProgram(this.shaderProg);
    }
    uniformInitFunc(this.gl, this.shaderProg);
}
WebGLStuffObj.prototype.getCurrentPixelData = function () {
    let currPixelData = new Float32Array(this.gl.drawingBufferWidth * this.gl.drawingBufferHeight * 4,
);
    this.gl.readPixels(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight, this.gl.RGBA, this.gl.FLOAT, currPixelData);
    return currPixelData;
}
WebGLStuffObj.prototype.getCurrentPixelBytes = function () {
    let currPixelByteData = new Uint8Array(this.gl.drawingBufferWidth * this.gl.drawingBufferHeight * 4,
);
    this.gl.readPixels(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight, this.gl.RGBA, this.gl.UNSIGNED_BYTE, currPixelByteData);
    return currPixelByteData;
}
WebGLStuffObj.prototype.display = function (lineWidthParam, drawOrderParam, clearBackgroundParam) {
    let clearBackground = clearBackgroundParam ?? true;
    let drawOrder = drawOrderParam ?? "tlp";
    if (clearBackground) {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);
    }
    //set width of lines drawn
    this.gl.lineWidth(lineWidthParam != null ? lineWidthParam : 1);
    
    //finally initialize variables for and draw graphics
    let indexCount, type, offset;
    //gl.drawElements(gl.SHAPE_TYPE, indexCount, type, offset);
    for (var i = 0; i < 3; i ++) {
        switch (drawOrder.charAt(i).toLowerCase()) {
            case "p":
                this.gl.drawElements(this.gl.POINTS, this.pointIndexCount, this.gl.UNSIGNED_SHORT, 0);
            break;
            case "l":
                this.gl.drawElements(this.gl.LINES, this.lineIndexCount, this.gl.UNSIGNED_SHORT, this.pointIndexCount * 2);
            break;
            case "t":
                this.gl.drawElements(this.gl.TRIANGLES, this.triangleIndexCount, this.gl.UNSIGNED_SHORT, (this.pointIndexCount+this.lineIndexCount)*2);
            break;
            default:
            
        }
    }
    // this.gl.drawElements(this.gl.TRIANGLES, this.triangleIndexCount, this.gl.UNSIGNED_SHORT, (this.pointIndexCount+this.lineIndexCount)*2);
    
    
    
    // //code to render lines
    
    // //initialize variables for and draw lines
    // // indexCount = dataObj.lineIndices.length;
    // // type = gl.UNSIGNED_SHORT;
    // // offset = dataObj.pointIndices.length * 2;
    // this.gl.drawElements(this.gl.LINES, this.lineIndexCount, this.gl.UNSIGNED_SHORT, this.pointIndexCount * 2);
    
    
    // //code to render triangles
    // //initialize variables for and draw graphics
    // // indexCount = dataObj.pointIndices.length;
    // // type = gl.UNSIGNED_SHORT;
    // // offset = 0;
    // this.gl.drawElements(this.gl.POINTS, this.pointIndexCount, this.gl.UNSIGNED_SHORT, 0);
}
WebGLStuffObj.prototype.cleanup = function () {
    this.gl.useProgram(null);
    if (this.vertexBuff) {
        this.gl.deleteBuffer(this.vertexBuff);
    }
    if (this.indexBuff) {
        this.gl.deleteBuffer(this.indexBuff);
    }
    // if (vs) {
    //     gl.detachShader(shaderProg, vs);
    //     gl.deleteShader(vs);
    // }
    // if (fs) {
    //     gl.detachShader(shaderProg, fs);
    //     gl.deleteShader(fs);
    // }
    if (this.shaderProg) {
        this.gl.deleteProgram(this.shaderProg);
    }
}

//export WebGLStuffObj;
