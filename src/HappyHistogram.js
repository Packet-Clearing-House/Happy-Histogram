/**
 * Generate an entirely HTML based histogram for events across a year
 * Version 1.1
 * @param targetId - ID in DOM to render into
 * @param monthData array of arrays - with int per day
 * @param color string - CSS color
 * @constructor
 */
function HappyHistogram (targetId, monthData, color ) {

    var bottom = 0;
    var top = 100;
    var width;
    var finalHTML = '';
    var max = 0;
    var i = 0;
    var i2 = 0;
    var day = 0;
    var localColor = '#043864';
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (color != undefined){
        localColor = color;
    }

    finalHTML += '<style>#' + targetId + ' .filledBottom { background-color: ' + localColor + ';}</style>';

    // figure max
    for (i = 0; i < monthData.length; i++) {
        for (i2 = 0; i2 < monthData[i].length; i2++) {
            if (monthData[i][i2] > max) max = monthData[i][i2];
        }
    }

    // zero out and then inject html for histogram
    finalHTML += '<div class="yearHistogram">' +
        '<div class="yAxisLabel">' + max + '</div>' +
        '<div class="yAxis">&nbsp;</div>' +
        '<div class="data">';

    for (i = 0; i < monthData.length; i++) {
        width = 1 / monthData[i].length * 100 ;

        finalHTML +=
        '<div class="month ' + monthNames[i] + '">' +
        '<div class="chart">';

        for (i2 = 0; i2 < monthData[i].length; i2++) {
            // calculate day height percentages
            day = monthData[i][i2];
            if (day < 0){
                day = 0;
            }
            if (day > 0){
                // round bottom to closest 2
                bottom = Math.ceil((day / max * 100) / 2) * 2;
                top = 100 - bottom ;
            } else {
                bottom = 0;
                top = 100;
            }
            finalHTML +=
                '<div class="bar" style="width: ' + width + '%">' +
                    '<div class="emptyTop" style="height: ' + top + '%">&nbsp;</div>' +
                    '<div class="filledBottom" style="height: ' + bottom + '%">&nbsp;</div>' +
                '</div>';
        }

      finalHTML +=
            '</div>' + // close chart
            '<div class="name">' + monthNames[i] + '</div>' + // add month label
            '</div>'; // close month
    }

    // close out 'yearHistogram' and 'data' divs
    finalHTML += '</div></div><br style="clear:both"/>';

    document.getElementById(targetId).innerHTML = finalHTML;
}
