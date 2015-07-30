# jquery.progress
Inspired by http://progressed.io/bar/28?title=progress, I create this very simple progress bar plugin.
Not like the link I provided, this plugin required no internet access, so you can use it where the internet access is limited.

I just simplly provide some options:

var settings = {<br/>
&nbsp;&nbsp;width: 90, // the width of bar<br/>
&nbsp;&nbsp;height: 20, // the height of bar<br/>
&nbsp;&nbsp;percent: 0, // the current percent<br/>
&nbsp;&nbsp;backgroundColor: '#555', // the color of the background<br/>
&nbsp;&nbsp;barColor: '#d9534f', // the color of the bar<br/>
&nbsp;&nbsp;radius: 4, // the radius of the corner<br/>
&nbsp;&nbsp;fontSize: 12, // the font size<br/>
&nbsp;&nbsp;fontColor: '#fff', // the color of the number<br/?
&nbsp;&nbsp;increaseTime: 1000.00/60.00, // the animation increase time, each increase time the bar will change increaseSpeed length<br/>
&nbsp;&nbsp;increaseSpeed: 1, // the increase length<br/>
&nbsp;&nbsp;animate: true // whether to use animation<br/>
};

You can check the demo I provided in this github to see how it works.
