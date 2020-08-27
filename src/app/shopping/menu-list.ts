export class menuList{
    Menu:any = [
        { 
          name: 'Grocery',
          url: 'grocery',
          iconClass: 'fa fa-carrot',
          active: false,
          submenu: [
            { name: 'Fresh Fruits', url: 'grocery' },
            { name: 'Fresh Vegetables', url: '' },
            { name: 'Fresh Dairy', url: '' },
            { name: 'Food grains & Oil', url: '' },
            { name: 'Meats, Egg & Fish', url: '' },
            { name: 'Spices', url: '' },
            { name: 'Snacks & Branded Food', url: '' },
            { name: 'Bakery & Cake', url: '' }
          ]
        },
        { 
          name: 'Beauty & Health',
          url: 'grocery',
          iconClass: 'fa fa-mortar-pestle',
          active: false,
          submenu: [
            { name: 'Tablets', url: '#' },
            { name: 'Mobiles', url: '#' },
            { name: 'Desktop', url: '#' }
          ]
        },
        { 
          name: 'Home & Kitchen',
          url: 'grocery',
          iconClass: 'fas fa-blender',
          active: false,
          submenu: [
            { name: 'Chrome', url: '#' },
            { name: 'Firefox', url: '#' },
            { name: 'Desktop', url: '#' }
          ]
        },
        { 
          name: 'Pets items',
          url: 'grocery',
          iconClass: 'fas fa-paw',
          active: false,
          submenu: [
            { name: 'Chrome', url: '#' },
            { name: 'Firefox', url: '#' },
            { name: 'Desktop', url: '#' }
          ]
        }
      ];
}