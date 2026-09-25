(function () {
  var base = '/gooddeeds0204-eng/YouGo/preview/';
  if (location.pathname !== base) {
    history.replaceState(null, '', base);
  }
})();
