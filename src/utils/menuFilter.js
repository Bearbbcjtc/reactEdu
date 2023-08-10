export function menuFilter(menu, role){
    const newMenu = menu.filter(item => {
        if( item.meta.role.indexOf(role)!==-1){
            return item;
        }
    }).map(item => {
        if(item.children){
            menuFilter(item.children, role);
        }
        return item;
    })
    return newMenu;
}