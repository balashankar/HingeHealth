const IdGenerator = (function () {
  let instance;
  
  function createInstance() {
    let count = 1;

    function generateId() {
      return ++count;
    }

    return {
      generateId,
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

module.exports = {
  IdGenerator,
};