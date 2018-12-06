window.addEventListener("keydown", moveKeys, false);

function moveKeys(e) {
  switch (e.keyCode) {
    case 37:
      console.log(e.keyCode);
      break;

    case 39:
      // right key pressed
      console.log(e.keyCode);
      break;
  }
}

export default moveKeys;
