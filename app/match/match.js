import Config from '../config/config';
import matchLine from './match-line';
import matchCurve from './match-curve';
import matchText from './match-text';
import matchCircle from './match-circle';
import matchPolygon from './match-polygon';
import matchArc from './match-arc';
import matchImage from './match-image';

const MathTool = {
    // eventType : mousedown/mousemove/keydown
    match(P, objects, eventType, multichose = false) {
        const res = [];

        objects.forEach(object => {
            // remove all the objects' active;
            if (!multichose) {
                object.isActive = null;
            } else {
                // console.log('multichose match');
            }

            switch (object.type) {
                case Config.objectTypes.line:
                case Config.objectTypes.textGroup:
                    matchLine(P, object, eventType, res);
                    break;
                case Config.objectTypes.curve:
                    matchCurve(P, object, eventType, res);
                    break;
                case Config.objectTypes.text:
                    matchText(P, object, eventType, res);
                    break;
                case Config.objectTypes.circle:
                    matchCircle(P, object, eventType, res);
                    break;
                case Config.objectTypes.polygon:
                    matchPolygon(P, object, eventType, res);
                    break;
                case Config.objectTypes.arc:
                    matchArc(P, object, eventType, res);
                    break;
                case Config.objectTypes.image:
                    matchImage(P, object, eventType, res);
                    break;
                default:
                    break;
            }
        });

        res.sort((a, b) => a.length - b.length);

        if (res[0]) {
            Object.keys(res[0]).forEach(key => {
                if (key !== 'object') {
                    res[0].object.isActive = res[0].object.isActive || {};
                    res[0].object.isActive[key] = res[0][key];
                }
            });
        }
        return res;
    },
};


export default MathTool;