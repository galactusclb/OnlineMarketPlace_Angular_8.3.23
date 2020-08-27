export type Menu = {
    name: string, 
    url?:string,
    iconClass: string, 
    active: boolean,
    submenu ?: { name: string, url: string }[]
  }