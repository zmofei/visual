function matrixRotation(input, rad) {
    return [
        (input[0] * Math.cos(rad)) + (input[1] * Math.sin(rad)),
        (input[0] * -Math.sin(rad)) + (input[1] * Math.cos(rad))
    ];
}

function pointsToBezierCurve(points, ctx) {
    const figuredPoints = [];
    points.forEach((point, index) => {
        const obj = {
            current: point,
        };
        const previousPoint = points[index - 1] || point;
        const nextPoint = points[index + 1] || point;
        let vPrevToNext = [nextPoint[0] - previousPoint[0], nextPoint[1] - previousPoint[1]];
        let vNextToPrev = [previousPoint[0] - nextPoint[0], previousPoint[1] - nextPoint[1]];

        /**
         *  make vAB horizontal, so that we can use x to get the e's precent
         *        c
         *                b   =rotate=>           c
         *    a                             a            b
         */

        const vX = [Math.abs(vPrevToNext[0]) || 10, 0];
        const rad = Math.acos(
            ((vPrevToNext[0] * vX[0]) + (vPrevToNext[1] * vX[1])) /
            (
                (Math.sqrt(vPrevToNext[0] ** 2) + (vPrevToNext[1] ** 2)) *
                Math.sqrt((vX[0] ** 2) + (vX[1] ** 2))
            ),
        );
        // console.log(index, rad, vPrevToNext, vX);
        /**
         *[x, y] * [cos(x)  -sin(x)]
         *         [sin(x)  cos(x) ]
         *
         * [x*cos+y*sin, x*-sin+y*cos]
         */
        const transForamtedCurrent = matrixRotation(point, rad);
        const transForamtedPreviousPoint = matrixRotation(previousPoint, rad);
        const transForamtedNextPoint = matrixRotation(nextPoint, rad);
        const xToStart = Math.abs(transForamtedCurrent[0] - transForamtedPreviousPoint[0]);
        const xToEnd = Math.abs(transForamtedCurrent[0] - transForamtedNextPoint[0]);
        const xStartPrecent = 0.5 || xToStart / (xToStart + xToEnd);
        const xEndPrecent = 0.5 || xToEnd / (xToStart + xToEnd);

        // console.log(index, xStartPrecent, xEndPrecent, point, rad, transForamtedCurrent)

        /**
         *          P -- C --- N
         *             /     \
         *          /            \
         *       A ------------------ B
         *
         * vCP = (vBA / 2) * (dPC / dPN);
         *
         * Px-point[0], Py - point[1]]
         *  = [vNextToPrev[0] / 2,vNextToPrev[1] / 2] * xStartPrecent;
         *
         * [Px-point[0], Py - point[1]]
         *  = [vNextToPrev[0] / 2 * xStartPrecent, vNextToPrev[1] / 2 * xStartPrecent];
         *
         * Px = vNextToPrev[0] / 2 * xStartPrecent + point[0];
         * Py = vNextToPrev[1] / 2 * xStartPrecent + point[1];
         */

        // if (index === 0) {
        //     const nextNextPoint = points[index + 2];
        //     const vNextNextPointToNext = [
        //         nextPoint[0] - nextNextPoint[0], nextPoint[1] - nextNextPoint[1],
        //     ];
        //     const vCurrentNext = [
        //         nextPoint[0] - point[0], nextPoint[1] - point[1],
        //     ];
        //     vPrevToNext = [
        //         vNextNextPointToNext[0] + vCurrentNext[0],
        //         vNextNextPointToNext[1] + vCurrentNext[1],
        //     ];
        // }

        // if (index === (points.length - 1)) {
        //     const prePreviousPoint = points[index - 2];
        //     const vPrepreToPre = [
        //         previousPoint[0] - prePreviousPoint[0],
        //         previousPoint[1] - prePreviousPoint[1],
        //     ];
        //     const vCurrentToPre = [
        //         previousPoint[0] - point[0],
        //         previousPoint[1] - point[1],
        //     ];
        //     vNextToPrev = [vPrepreToPre[0] + vCurrentToPre[0], vPrepreToPre[1] + vCurrentToPre[1]];
        // }


        obj.previous = index === 0 ? obj.current : [
            ((vNextToPrev[0] / 2) * xStartPrecent) + point[0],
            ((vNextToPrev[1] / 2) * xStartPrecent) + point[1],
        ];
        obj.next = index === (points.length - 1) ? obj.current : [
            ((vPrevToNext[0] / 2) * xEndPrecent) + point[0],
            ((vPrevToNext[1] / 2) * xEndPrecent) + point[1],
        ];

        // console.log(vPrevToNext, xEndPrecent, obj.next[0] - point[0]);

        figuredPoints.push(obj);
    });

    // // debug
    // if (ctx) {
    //     ctx.beginPath();
    //     figuredPoints.forEach((item, index) => {
    //         ctx.fillStyle = 'black';
    //         ctx.fillText(index, item.current[0], item.current[1]);
    //         ctx.fillRect(item.current[0], item.current[1], 5, 5);

    //         ctx.beginPath();
    //         ctx.fillStyle = 'red';
    //         ctx.fillRect(item.previous[0], item.previous[1], 5, 5);
    //         ctx.fillText(index, item.previous[0], item.previous[1]);

    //         ctx.beginPath();
    //         ctx.fillStyle = 'blue';
    //         ctx.fillRect(item.next[0], item.next[1], 5, 5);
    //         ctx.fillText(index, item.next[0], item.next[1]);
    //     });
    // }

    return figuredPoints;
}

export default pointsToBezierCurve;