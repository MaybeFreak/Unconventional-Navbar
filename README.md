# A different kind of Navbar

### Introduction

This repo dives into how I created a rather interessting navbar for friends portfolio. The live version can be viewed here: https://faith-guanga.vercel.app. <br/>
If you prefer following along with a video there is a video version of this walk through on youtube: https://youtu.be/5OonDVN_DxQ.

## Let's get into it
  1. Let's start out by creating a new React app, I will be using vite for this project so I run `npm create vite@latest` and then go in and clean up all the boilerplate code.
  2. For our Background we will just have the html element take care of that and then create a foreground by creating a new div in our App.jsx and add some basic styling to it to cover the entire page and give it different color. <br/>
```js
import "./App.css";

function App() {
  return (
    <main>
      <div id="Foreground"></div>
    </main>
  );
}

export default App; 
```
```css
#Foreground {
  background-color: whitesmoke;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```
  3.  Using <a href="https://bennettfeely.com/clippy/" target="_blank">Clippy</a> we can easily create a CSS clip-path to cut out the corner.
```css
#Foreground {
  background-color: whitesmoke;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  clip-path: polygon(100% 0, 100% 20%, 20% 100%, 0 100%, 0 0);
}
```
  4.  If we wish to add a drop shadow to our foreground we need to use a little work around. Start by wrapping the foreground div in a wrapper div then make the wrapper div cover the whole page and a `filter: drop-shadow` to it
```js
import "./App.css";

function App() {
 
  return (
    <main>
      <div className="wrap">
        <div id="Foreground"></div>
      </div>
    </main>
  );
}

export default App;
```

```css
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: drop-shadow(1px 6px 3px rgba(0, 0, 0, 0.5));
}
```
  5.  Now it's time to create the nav element
```js
import "./App.css";

function App() {

  return (
    <main>
      <div className="wrap">
        <div id="Foreground">
          <nav
            className="navBar">
            <ul>
              <li>About</li>
              <li>Resume</li>
              <li>Projects</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

export default App;
```
And some styling, I wil be using nested css but it's nor required 
```css
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: drop-shadow(1px 6px 3px rgba(0, 0, 0, 0.5));
}

.navBar {
/* This is what helps us align the navbar to start at the start of the slope */
  position: fixed;
  bottom: 0; 
  left: 20%; /* this needs to match up with the % used for the clip-path */

  > ul {
    display: flex;
    gap: 2rem;
    list-style: none;

    > li {
      font-weight: bold;
      font-size: 2rem;
    }
  }
}
```
  6.  You will notice that after the last step we can no longer see out Navbar, we now need to postion add some more thing in order to postion it and prepare it for the rotation. We want to add the transform style to our JSX so we can set the rotation with code in a later step.
```js
import "./App.css";

function App() {

  return (
    <main>
      <div className="wrap">
        <div id="Foreground">
          <nav
            className="navBar"
            style={{
              transform: `translate(-50%, 50%)`,
            }}
          >
            <ul>
              <li>About</li>
              <li>Resume</li>
              <li>Projects</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

export default App;
```
  7.  Now that our navbar is centered on the start of the slope let's add the rotation, we do this by running a simple calculation that takes the width and height of the triangle we "cut out" and after some math magic gives us a angle in deg we can use. <br/>
In order to get the width and height of our triangle we use `window.innerWidth` and `window.innerHeight` and multiply it by 0.8 this case. We use 0.8 since out corers atart at 20% into the page and 20% down the page. 1.0 - 0.2(our start point in this case 20%) = 0.8 or 80% of the page.
Now that we have this we want the inverse tangent of the result of the height devided by the width, then we multiply that result by 180 and devide it by π to get the angle of the slope.
```js
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [slopeAngle, setSlopeAngle] = useState(0);

  useEffect(() => {
    const run = window.innerWidth * 0.8;
    const rise = window.innerHeight * 0.8;
    setSlopeAngle((Math.atan(rise / run) * 180) / Math.PI);
  }, []);

  return (
    <main>
      <div className="wrap">
        <div id="Foreground">
          <nav
            className="navBar"
            style={{
              transform: `translate(-50%, 50%) rotate(-${slopeAngle}deg)`,
            }}
          >
            <ul>
              <li>About</li>
              <li>Resume</li>
              <li>Projects</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

export default App;
```
  8.  Now we do some final adjustment to the navbars postion so we see all of it again. 
```css
.navBar {
  position: fixed;
  bottom: 0;
  left: 20%;

  > ul {
    display: flex;
    gap: 2rem;
    list-style: none;

    margin-left: 60dvh; /* I like using the window height for this but play around and see what works for you*/
    transform: translate(0%, -100%);

    > li {
      font-weight: bold;
      font-size: 2rem;
    }
  }
}
```
  9.  Well it works now, sort of, as soon as the window resizes it will no longer match up. But all we need to to to fix this is add a eventListener that listens for the resize event and then it runs a function that recalculates the angle of the slpo with the new window size.
```js
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [slopeAngle, setSlopeAngle] = useState(0);

  const updateSlopeAngle = () => {
    const run = window.innerWidth * 0.8;
    const rise = window.innerHeight * 0.8;
    setSlopeAngle((Math.atan(rise / run) * 180) / Math.PI);
  };

  useEffect(() => {
    const run = window.innerWidth * 0.8;
    const rise = window.innerHeight * 0.8;
    setSlopeAngle((Math.atan(rise / run) * 180) / Math.PI);

    addEventListener("resize", updateSlopeAngle);
  }, []);

  return (
    <main>
      <div className="wrap">
        <div id="Foreground">
          <nav
            className="navBar"
            style={{
              transform: `translate(-50%, 50%) rotate(-${slopeAngle}deg)`,
            }}
          >
            <ul>
              <li>About</li>
              <li>Resume</li>
              <li>Projects</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

export default App;
```

## Conclusion
You should now have your own working version of this repository and while it is rather basic in it's current form i encourage to play around with it and see what you can create with it. <br/>
If you end up using it for something and feel like sharing it I would love to see it, seed me a message on <a href="https://www.linkedin.com/in/michael-pope-dev/" target="_blank">LinedIn</a> or send and email to: michaelpope97@gmail.com.
<br/><br/>
If you are stuck or have any questions I recommend taking a look at the video walk through since I go a lot more in depth over there of if that doesn't help then feel free to reach out to me via the above mention ways. 
