const store = (function () {
 



        const items=  [
                { id: cuid(), name: 'apples', checked: false },
                { id: cuid(), name: 'oranges', checked: false },
                { id: cuid(), name: 'milk', checked: true },
                { id: cuid(), name: 'bread', checked: false }
            ];
        const hideCheckedItems= false;
        const searchTerm = '';

        function findById (id) {
          const item = store.items.find(item => item.id === id);
          return item
        }

        function addItem (name) {
          try {
            Item.validateName(name);
            this.items.push( Item.create(name) );
          } catch (e) {
            console.log(e)
          }
        }

        function findAndToggleChecked (id) {
          const foundItem = store.items.find(item => item.id === id);
          foundItem.checked = !foundItem.checked;
        }
        
        function findAndUpdateName (id, newName) {
          try {
            Item.validateName(newName);
            const item = store.items.find(item => item.id === id);
            item.name = newName;
          } catch (e) {
            console.log(e)
          }
        }

        function findAndDelete (id) {
          const index = store.items.findIndex(item => item.id === id);
          store.items.splice(index, 1);
        }


      return {
        items,
        hideCheckedItems, 
        searchTerm, 
        findById, 
        addItem, 
        findAndToggleChecked,
        findAndUpdateName,
        findAndDelete
      }

}() );