# Canvas API

**What is Canvas?**  
A resolution-dependent bitmap canvas for:
- Dynamic 2D graphics
- Real-time rendering
- Game development
- Data visualization

**Basic Setup**:
```html
<canvas id="myCanvas" width="800" height="600"></canvas>

<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d'); // Get 2D rendering context
</script>
```

**Coordinate System**:
- Origin (0,0) at top-left corner
- X-axis: Left to right
- Y-axis: Top to bottom


- **`Width` and `height` can be determined inside the script**


## script

- The script uses two objects:
	- Ball
	- Paddle


The object's dimensions are passed to the constructors, which are determined as global at the top.

Both have `render()` methods which uses canvas api functions to render the objects.

##### **`gameLoop()` Recursively clear the canvas and render the canvas infinitely**

- `ctx.clearRect(0, 0, canvas.width, canvas.height)`
	Clears the hole cavas

- Verify paddleState and gameState for changes in coordinates
	- paddleState verifies both paddle states;
	- gameState verifies ball position: moving or stoped;

- The paddleState are updated when a key is pressed
- the gameState is updated when Space is press, or a score is made.
