/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/3-UsingAPIs/Week1#exercise-3-roll-a-die

- Run the unmodified program and confirm that the problem described occurs.
- Refactor the `rollDie()` function from callback-based to returning a
  promise.
- Change the calls from `callback()` to calls to `resolve()` and `reject()`.
- Refactor the code that call `rollDie()` to use the promise it returns.
- Does the problem described above still occur? If not, what would be your
  explanation? Add your answer as a comment to be bottom of the file.
------------------------------------------------------------------------------*/

export function rollDie() {
  return new Promise((resolve, reject) => {
    const randomRollsToDo = Math.floor(Math.random() * 8) + 3;
    console.log('Random', randomRollsToDo);
    console.log(`Die scheduled for ${randomRollsToDo} rolls...`);

    const rollOnce = (roll) => {
      const value = Math.floor(Math.random() * 6) + 1;
      console.log(`Die value is now: ${value}`);
      if (roll > 6) {
        reject(new Error('Oops... Die rolled off the table.'));
        return;
      }

      if (roll === randomRollsToDo) {
        resolve(value);
        return;
      }
      if (roll < randomRollsToDo) {
        setTimeout(() => rollOnce(roll + 1), 500);
      }
    };
    rollOnce(1);
  });
}

function main() {
  rollDie()
    .then((value) => {
      console.log(`Success! Die settled on ${value}.`);
    })
    .catch((error) => {
      console.log(error.message);
    })
    .finally(() => {
      console.log('Roll finished.');
    });
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}

// Explanation
// Using Promises resolves the issue of multiple callbacks after an error like
// new Error('Oops... Die rolled off the table.'). However, if randomRollsToDo > 6,
// the rolling continues unnecessarily even though the promise is already settled.
// To solve that we can use return after resolve or reject
