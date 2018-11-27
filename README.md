# WillowTree Name Game

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Try it out

```
git clone https://github.com/acjones617/willowtree-name-game.git
cd willowtree-name-game/
npm install
npm start
```

Navigate to http://localhost:3000/

## How to play

You will be presented with five faces and asked to identify the listed name. To make a guess, click on one of the faces. If correct, you will see a green highlighting and will shortly be introduced with five new faces and a new name. If incorrect, you will see a red highlighting. In either case, the name corresponding to the face will be displayed.

Keyboard shortcuts work as well. Right arrow, down arrow, "j", and "l" move the "cursor" to the right, down the list of five faces. Left arrow, up arrow, "k" and "h" move the "cursor" to the left, up the list of five faces. The "active" face will be highlighted in black. To make a guess, hit "enter" on a face when it is highlighted in black.

### Scoring

If you click the "Keep Score" button, you will be presented with metrics to track how you're doing: correct guesses, incorrect guesses, average time to make a correct guess, total score, and high score. In addition, a timer will count how long the current round has been going for.

### Other options

If you click the "Other options" button, you will be presented with other possible modes of play.

Select faces from:
1. Everyone, including current and former team members.
2. Only current employees.
3. Team members whose name begin with "Mat".

Toggle between:
1. Reverse mode. Select the correct name from a list of five given a single picture.
2. Hint mode. The choices narrow by one every five seconds.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
