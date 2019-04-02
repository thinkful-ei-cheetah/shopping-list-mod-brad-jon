'use strict';

const Item = (function () {

  function validateName (name) {
    if (!name) {
      throw new Error ('Name does not exist.');
    };
  }

  function create (name) {
    return {
      id: cuid (),
      name: name,
      checked: false,
    };
  }




  return {validateName, create}

}() );