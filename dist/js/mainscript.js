const s = (() => {
  const t = () => {
    console.log("Ultima funcionalidad tests");
  };
  return {
    childsTest: function() {
      try {
        t();
      } catch (e) {
      }
    }
  };
})(), n = () => {
  s.childsTest();
};
window.addEventListener("load", () => {
  n();
});
//# sourceMappingURL=mainscript.js.map
