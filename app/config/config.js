const config = {
    objectTypes: {
        line: Symbol('line'),
        text: Symbol('text'),
        textGroup: Symbol('textGroup'),
        circle: Symbol('circle'),
        polygon: Symbol('polygon'),
    },
    objectUserSets: {
        dragable: true, // true: user can drag the objet by using mouse
        bufferSize: 10, // the maximum offset of the point or object that can choose is
        pointEditable: true, // true: user can eidt the point of one object
        boundaryCheck: true,
        mouseOverEventEnable: true,
        clickable: true,
        // active: false,
    },
    ctxStyleConfig: {
        fontSize: 12,
        textBaseline: 'alphabetic',
        textAlign: 'left',
        fillStyle: 'black',
        strokeStyle: 'black',
        lineWidth: 1,
        lineJoin: 'miter',
        lineCap: 'butt',
    },
    ctxOperationConfig: {
        rotate: 0,
        textRotate: 0,
        splitText: false,
    },
};

export default config;