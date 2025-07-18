

https://github.com/user-attachments/assets/f2a91492-2dd6-4f5c-b820-c9e55ee049af





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

- The script creates two objects:
	- Ball
	- Paddle


The object's dimensions and attributes are passed to the constructors, which are determined as global at the top.

Both have `render()` methods, which use canvas api functions to render the objects.

##### **`gameLoop()` Recursively clear the canvas and render the canvas infinitely**

- `ctx.clearRect(0, 0, canvas.width, canvas.height)`
	Clears the whole canvas

- Verify paddleState and gameState for changes in coordinates
	- paddleState verifies both paddle states;
	- gameState verifies ball position: moving or stopped;

- The paddleState is updated when a key is pressed
- The gameState is updated when Space is pressed, or a score is made.


### Start the game loop
```js
window.addEventListener('load', function() {
    gameLoop();
})
```
