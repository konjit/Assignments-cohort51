/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/2-Browsers/Week1#exercise-3-the-logo-hijack

1. Find out how to select the element that contains the Google logo, and store 
   it in a variable.
2. Modify the `src` and `srcset` of the logo so that it's replaced by the 
   HackYourFuture logo instead.
------------------------------------------------------------------------------*/
function hijackGoogleLogo() {
  const googleLogo = document.querySelector('img[alt=Google]');
  const hyfLogo =
    'https://cdn.prod.website-files.com/62745a1007e49e2461fb7ecd/62745a1007e49e6f2afb7fd1_HYF.svg';
  if (googleLogo && hyfLogo) {
    logo.src = hyfLogo;
    logo.srcset = hyfLogo;
  }
}

hijackGoogleLogo();