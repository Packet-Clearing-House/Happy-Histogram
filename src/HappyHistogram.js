/**
 * Generate an entirely HTML based histogram for events across a year
 * Version 1.3
 * @param targetId - ID in DOM to render into
 * @param monthData array of arrays - with int per day
 * @param color string - CSS color
 * @constructor
 */
function HappyHistogram (targetId, monthData, color ) {

    var bottom = 0;
    var top = 100;
    var width;
    var extraClass;
    var finalHTML = '';
    var max = 0;
    var i = 0;
    var i2 = 0;
    var day = 0;
    var localColor = '#043864'; // a dark blue kinda job
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (color != undefined){
        localColor = color;
    }

    finalHTML += '<style>#' + targetId + ' .filledBottom { background-color: ' + localColor + ';}</style>';

    // figure max and be aware of so many array levels
    for (i = 0; i < monthData.length; i++) {
        for (i2 = 0; i2 < monthData[i].length; i2++) {
            if (Array.isArray(monthData[i][i2])){
                if(Array.isArray(monthData[i][i2][0])){
                    tmpVal = 0;
                    for (i3 = 0; i3 < monthData[i][i2].length; i3++) {
                        tmpVal = monthData[i][i2][i3][0] + tmpVal;
                    }
                    val = tmpVal;
                } else {
                    val = monthData[i][i2][0];
                }
            } else {
                val = monthData[i][i2];
            }
            if (val > max) max = val;
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

        // loop through each data value in the month
        for (i2 = 0; i2 < monthData[i].length; i2++) {

            // We'll use the days array to hold the value of the day and any possible
            // classes for that day. If there's a chance that the day has sub values
            // the user want's to show, then we'll put an array inside this this array.
            daysArray = [];

            // calculate day height percentages. Be aware of array inception level a billion
            if (Array.isArray(monthData[i][i2])){
                if (monthData[i][i2][0] !== undefined) {
                    if(Array.isArray(monthData[i][i2][0])) {
                        // each value in each day has a class, pull it out
                        tmpVal = 0;
                        for (i3 = 0; i3 < monthData[i][i2].length; i3++) {
                            tmpVal = monthData[i][i2][i3][0] + tmpVal;
                            itemVal = monthData[i][i2][i3][0];
                            if(monthData[i][i2][i3][1] !== undefined) {
                                extraClass = monthData[i][i2][i3][1];
                            } else {
                                extraClass = '';
                            }
                            daysArray.push([itemVal, extraClass]);
                        }
                        day = tmpVal;
                    } else {
                        // each day has a class, pull it out
                        day = monthData[i][i2][0];
                        if(monthData[i][i2][1] !== undefined) {
                            extraClass = monthData[i][i2][1];
                        } else {
                            extraClass = '';
                        }
                        daysArray.push([day, extraClass]);
                    }
                }
            } else {
                day = monthData[i][i2];
                daysArray.push([day, '']);
            }
            if (day < 0){
                day = 0;
            }
            if (day > 0){
                // round bottom to closest 2
                bottom = Math.ceil((day / max * 100) / 2) * 2;
                top = 100 - bottom ;
            } else {
                // an empty day, nothing to see here, move along!
                bottom = 0;
                top = 100;
            }

            // Build up HTML for the column
            finalHTML += '<div class="bar" style="width: ' + width + '%">' +
                    '<div class="emptyTop" style="height: ' + top + '%">&nbsp;</div>';
            if (daysArray.length === 1){
                // this case there's just one value for the day (bottom)
                finalHTML += '<div class="filledBottom ' + daysArray[0][1] + '" style="height: ' + bottom  + '%">&nbsp;</div>';
            } else {
                // we're here because there's sub day values the user wants to show, possibly with a class per
                // value per day.  Instead of using the day value (bottom), we'll stack up divs per value and calculate
                // their percentage of the max to use as the percentage height of the bar
                percentTotal = 0;
                for (i4 = 0; i4 < daysArray.length; i4++) {
                    // keep track of rolling percentTotal vs bottom.  If they differ on the last value in daysArray,
                    // round it up (some times WAY up) to cover the gap.  This prevents missing pixel(s) at the
                    // bottom of the histogram
                    percent = (daysArray[i4][0]/max)* 100;
                    percentTotal += percent;
                    if(daysArray.length - 1  === i4 && percentTotal !== bottom){
                        percent = bottom - percentTotal + percent;
                    }
                    finalHTML += '<div class="filledBottom ' + daysArray[i4][1] + '" style="height: ' + percent + '%">&nbsp;</div>';

                }
            }
            finalHTML += '</div>';
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
