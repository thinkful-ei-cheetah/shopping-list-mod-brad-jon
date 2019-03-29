let STORE = {
   items:[{id: 1, name: "apples", checked: false}, {id: 2, name: "oranges", checked: false}, {id: 3, name: "milk", checked: true}, {id: 4, name: "bread", checked: false} ],
   hideCompleted: false
}

function renderShoppingList(tempItems)
{
    // have access to STORE
    let renderItems=[];
    if (tempItems.items.length === 0)
    {
      $('.shopping-list').html('nope')
      return; 
    }

    if (STORE.hideCompleted)
    {
      tempItems.items.filter((item)=> item.checked===false).forEach((item)=> renderItems.push(templateBuilder(item)));
    } else
    {
      tempItems.items.forEach((item)=> renderItems.push(templateBuilder(item)));
    }

    $('.shopping-list').html(renderItems);
}

function templateBuilder(item)
{
    const checkedClass = item.checked ? 'shopping-item__checked' : '';

    return `
      <li class="js-item-index-element" data-item-id="${item.id}">
        <span class="shopping-item js-shopping-item ${checkedClass}">${item.name}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
          <button class="shopping-item-edit js-item-edit">
          <span class="button-label">edit</span>
        </button>
        </div>
     </li>
    `;
}

function handleNewItemSubmit()
{
    const item_name = $('input#shopping-list-entry').val();
    $('input#shopping-list-entry').val('');
    STORE.items.push({id: (STORE.items.length+1), name: item_name, checked: false});
    renderShoppingList(STORE);
}

function handleItemCheckClicked(clickType, id)
{
    const found =  STORE.items.find((item) => item.id === id);
    found.checked = !found.checked;
    renderShoppingList(STORE);
}

function handleDeleteItemClicked(id)
{
    STORE.items = STORE.items.filter((item) => item.id !== id);
    renderShoppingList(STORE);
}

function handleToggleHideFilter() {
      STORE.hideCompleted = !STORE.hideCompleted;
      renderShoppingList(STORE);
}

function handleSearchEvent()
{
    const search_text = $('input#searchbox').val();
    $('input#searchbox').val('');
    let searchitems= {};
    searchitems.items = STORE.items.filter((item)=> item.name===search_text);
    renderShoppingList(searchitems);
}

function handleEditSumbitted(id, edited)
{

      const found =  STORE.items.find((item) => item.id === id);
      found.name = edited;
      renderShoppingList(STORE);
} 

function getItemIdFromElement(item) {
  return $(item)
    .closest('li')
    .data('item-id');
}



$(function () {
    $('#js-shopping-list-form').submit(event => {
        event.preventDefault();
        handleNewItemSubmit(event);
    })
});

$(function () {
  $('#search-form').submit(event => {
      event.preventDefault();
      handleSearchEvent(event);
  })
});




$(function () {
    $('.shopping-list').on( "click", ".shopping-item-toggle", function(event) {  
      event.preventDefault(); 
      const id = getItemIdFromElement(event.currentTarget);
       handleItemCheckClicked(event.currentTarget.outerText, id);
      });
});

$(function () {
    $('.shopping-list').on( "click", ".shopping-item-delete", function(event) {
        const id = getItemIdFromElement(event.currentTarget);
        handleDeleteItemClicked(id);
        
      });
});

$(function () {
  $('.shopping-list').on( "click", ".shopping-item-edit", function(event) {
    event.preventDefault();
    
    
    
    $(function () {
      $('.edit-box').on( "click", ".edit-box-button", function(event) {
        const id = getItemIdFromElement(event.currentTarget);
        const edited = $( this ).siblings().val();
        handleEditSumbitted(id, edited)

      })
    });


      const name = $( this ).parent().siblings().text();
      const found =  STORE.items.find((item) => item.name === name);
      const textToAdd = ` <div class="edit-box">
        <input type="text" name="editbox" id="editbox" value="${found.name}">
        <button class="edit-box-button">
            <span class="button-label">edit</span>
          </button>
        </div>`;
      $( this ).parent().siblings().html(textToAdd);
      
    });
});


$('.js-hide-completed-toggle').on('click', () => {
  handleToggleHideFilter();
});



$(renderShoppingList(STORE));