# Happy Histogram

## What

Happy Histogram (HH) is a simple JavaScript library for generating a
client side histogram showing activity across 
a year.  This JavaScript
library uses no 3rd party libraries (eg D3 or jQuery) and is barely over 1700 _bytes_ in size. 
The DOM elements used are only
HTML (floating DIVs) and not any fancy Canvas or SVG. The final histogram is very 
fast to render and is 100% responsive, looking good on both mobile
and desktop browsers.

## Example

This repo includes an example page which [you can view](https://packet-clearing-house.github.io/Happy-Histogram/example/).

As well, see PCH's [Calendar of Internet Governance Meetings](https://pch.net/meetings). This was 
the inception page for this library and looks like this:

[![](./example/hh.png)](https://pch.net/meetings)

## Why

I had tried a number of full blown graphing libraries ([jqPlot](http://www.jqplot.com/), [Flot](http://www.flotcharts.org/) and [jQuery sparkline](http://omnipotent.net/jquery.sparkline/), all awesome in their own right) as well, I looked at the [top available JS solutions](https://github.com/search?l=JavaScript&q=histogram&type=Repositories&utf8=%E2%9C%93). They all failed
me in one way or another.  Some of them didn't like having hundreds of data
points being rendered on them.  Some of them added unwanted anti-aliasing
on 1 pixel wide elements (I'm looking at you [Canvas](http://stackoverflow.com/questions/195262/can-i-turn-off-antialiasing-on-an-html-canvas-element)!). Many of them were
going to take a lot of effort to look good on mobile devices at the horizontal
scaled I was looking for.

So, I decided to roll my own!

## How

### Basics

1. Download [the latest HH](https://github.com/Packet-Clearing-House/Happy-Histogram/releases/latest) and
 grab the minified CSS and JS from the `dist` directory.
2. Include HH's JavaScript and CSS: 
   ```
   <script src="HappyHistogram.min.js" ></script>
   <link rel="stylesheet" href="HappyHistogram.min.css" />
   ```
1. Define the HTML where you want to render your histogram (must be an ID): ``<div id="histogram"></div>``
1. Declare your data set as a multi-dimentsional array, with one sub-array for each month. 

   ```
   var Year = [
       [1,0,0,0,0,0,0,0,0,0,0,1,0,1,0],
       [2,0,0,0,0,0,0,0,0,0,0,1,0,1,0],
       [1,0,0,0,0,0,0,0,0,0,0,1,0,1,0],
       [1,0,0,0,0,0,0,0,0,0,0,1,0,1,0],
       [3,0,0,0,0,0,2,0,0,0,0,1,0,1,0],
       [1,0,0,0,0,0,0,0,0,0,0,1,0,1,0],
       [1,0,0,0,0,0,0,0,0,0,0,1,0,1,0],
       [4,0,0,0,1,0,0,0,0,0,0,1,0,1,0],
       [1,0,0,0,0,0,0,0,0,0,0,1,0,1,0],
       [1,0,0,0,0,0,0,0,0,0,0,1,0,1,0],
       [3,0,0,0,0,2,0,0,0,0,0,1,0,1,0],
       [1,0,0,0,0,1,0,0,0,0,0,0,0,1,0]
   ];
   ```
   
   Careful!  Garbage in, garbage out - HH will not validate any values, only accepts
   ints or floats and will not pad for missing or ``NULL`` days.
1. Call HH specifying target, data and CSS color: ``HappyHistogram('histogram', Year);`` . Your target must be an ID, not a class. 

### Per Day Class

If you want to be able to have different colors for different days, you can uses CSS classes.  
Instead of passing in a value, you pass in an array.  The zeroth element is the value
and the first element is the class name.  To get multiple class names, pass in the first element
as a string with spaces between each class (see `extra-secret-class` below):

```
var Year = [
   [[1,'foo'],[2,'bar'],[3,'bash']],
   [[4,'bar'],[2,'bar'],[3,'bash']],
   [[2,'bash'],[2,'bar'],[3,'bash']],
   [[2,'bash'],[2,'bash'],[3,'bash']],
   [[2,'foo'],[2,'foo'],[3,'foo']],
   [[2,'bash'],[2,'foo'],[3,'foo']],
   [[2,'foo'],[2,'bash'],[3,'foo']],
   [[3,'bar'],[2,'foo'],[3,'bash']],
   [[2,'foo'],[5,'bar extra-secret-class'],[3,'foo']],
   [[2,'foo'],[2,'foo'],[3,'foo']],
   [[4,'foo'],[3,'foo'],[3,'bar']],
   [[2,'bar'],[2,'foo'],[3,'foo']],
];
```

Note that HH does some limited validation to ensure that array elements are correctly populated.

For an example of this, see "Metasyntactic variables used per month" on 
[example page](https://packet-clearing-house.github.io/Happy-Histogram/example/).

### Per Value Per Day Class

Like the example above with a class per day, but instead each value within a day can have it's
own class.  More arrays, but this time arrays within arrays within arrays WITHIN ARRAYS!!! ;) We're 
 using some days that have no values `0,` some days that have two values
`[[1,'telepresense'],[10,'cancelled']],` and some days that have 3 values 
`[[1,'face2face'],[4,'telepresense'],[5,'cancelled']],`. 

```
    var Year = [
        [
            [[1,'telepresense'],[10,'cancelled']],
            0,
            0,
            [[4,'telepresense'],[9,'cancelled']],
            [[5,'telepresense'],[8,'cancelled']],
            [[4,'telepresense'],[7,'cancelled']],
            [[2,'telepresense'],[5,'cancelled']],
            0,
            [[1,'telepresense'],[2,'cancelled']],
            0,
            [[6,'telepresense'],[1,'cancelled']],
            [[8,'telepresense'],[4,'cancelled']],
            0,
            [[2,'telepresense'],[2,'cancelled']],
            [[8,'telepresense'],[1,'cancelled']],
            [[1,'face2face'],[4,'telepresense'],[5,'cancelled']],
            [[1,'telepresense'],[8,'cancelled']],
            [[5,'telepresense'],[1,'cancelled']],
            0,
            [[2,'telepresense'],[4,'cancelled']],
            [[7,'telepresense'],[5,'cancelled']],
            0,
            [[5,'telepresense'],[2,'cancelled']],
            0,
            0,
            [[1,'telepresense'],[1,'cancelled']],
            0,
            [[1,'face2face'],[4,'telepresense'],[5,'cancelled']],
            [[7,'telepresense'],[2,'cancelled']],
            0,
            [[2,'telepresense'],[1,'cancelled']],
        ],
        # 11 MORE ARRAYS OF EACH MONTH HERE
```

For an example of this, see "Meetings affected by COVID19 2020" on 
[example page](https://packet-clearing-house.github.io/Happy-Histogram/example/).  As well,
see the PCH [Internet Meetings page](https://www.pch.net/meetings),
 which this Per Value Per Day class feature was written for in HH 1.3.

### Syntax

**Bar Color** - Pass in the CSS value when you
call HH: ``HappyHistogram('histogram', Year, 'red');`` or ``HappyHistogram('histogram', Year, '#ddd');``. Default color is ``#043864``

**Histogram Height** -  _After_ you have included HH's CSS, declare an update CSS entry for the height ``.yearHistogram .month .chart { height: 25px; }``

**Background Color** - _After_ you have included HH's CSS, declare an update CSS entry
for the background ``.yearHistogram .emptyTop { background-color: yellow; }``

**Hover color for just data bar** - Again, _after_ you have included HH's CSS, declare
 a ``hover`` psuedo class for just the bottom part.  Note that you'll need include
 the ID of the  DOM element for you histogram: ``#histogram .yearHistogram .filledBottom:hover {background-color: #ddd;}``

**Hover color entire bar, all the way to the top** - Again, _after_ you have included HH's CSS, declare
 a ``hover`` psuedo class for just the entire.  Note that you'll need include
 the ID of the  DOM element for you histogram: ``#histogram .yearHistogram .bar:hover {background-color: #ddd;}``

## License

MIT

## Version History

- 1.3 - 04/15/2020: Enable values to be arrays of arrays so classes can passed for each value within a day 
- 1.2 - 04/09/2020: Enable values to be arrays so classes can passed for each day 
- 1.1 - 11/16/2016: Fix gap on Safari, add more examples
- 1.0 - 10/24/2016: Initial release

