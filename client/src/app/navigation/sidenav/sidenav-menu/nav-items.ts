import { Injectable } from "@angular/core";

export interface NavItem {
  id: string;
  name: string;
  type: string;
  route: string;
}

export interface NavCategory {
  id: string;
  name: string;
  type: string;
  route?: string;
  items?: NavItem[];
}


// Initialisation des sections
const SECTIONS: NavCategory[] = [
  {
    id: 'applications',
    name: 'Applications',
    type: 'toggle',
    route: '/applications',
    items: [
      {
        id: 'perinatalite',
        name: 'Périnatalité',
        type: 'link',
        route: '/applications/perinatalite'
      },
      {
        id: 'enfance',
        name: 'Enfance',
        type: 'link',
        route: '/applications/enfance'
      },
      {
        id: 'adolescence',
        name: 'Adolescence',
        type: 'link',
        route: '/applications/adolescence'
      },
      {
        id: 'adulte',
        name: 'Adulte',
        type: 'link',
        route: '/applications/adulte'
      },
      {
        id: 'senior',
        name: 'Senior',
        type: 'link',
        route: '/applications/senior'
      }
    ]
  },
  {
    id: 'about_me',
    name: 'Votre sophrologue',
    type: 'toogle',
    items: [
      { id: 'appointment', name: 'Prendre rendez-vous', type: 'link', route: '/rdv'},
      { id: 'signup', name: 'S\'inscrire', type: 'link', route: '/signup' },
      { id: 'signin', name: 'Se connecter', type: 'link', route: '/signin' }
    ]
  },
  {
    id: 'espace_client',
    name: 'Espace client',
    type: 'toggle',
    items: [
      { id: 'appointment', name: 'Prendre rendez-vous', type: 'link', route: '/rdv'},
      { id: 'signup', name: 'S\'inscrire', type: 'link', route: '/signup' },
      { id: 'signin', name: 'Se connecter', type: 'link', route: '/signin' }
    ]
  },
  {
    id: 'informations',
    name: 'Informations Pratiques',
    type: 'toggle',
    items: [
      { id: 'seances', name: 'Description des seances', type: 'link', route: '/prestations' },
      { id: 'tarifs', name: 'Tarification', type: 'link', route: '/tarification'}
    ]
  },
];

@Injectable()
export class NavigationItems {
  
  // Récupération des catégories
  getCategories()
}