import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'bi bi-house-door',
        label: 'Accueil'
    },
  {
    routeLink: 'carriere',
    icon: 'bi bi-people',
    label: 'Carriere'
  },
    {
        routeLink: 'service',
        icon: 'bi bi-house-gear',
        label: 'Service',
        items: [
            {
                routeLink: 'service/direction',
                icon: 'fal fa-home',
                label: 'Direction'
            },
            {
              routeLink: 'service/departement',
              icon: 'fal fa-home',
              label: 'Departement'
            }
        ]
    },
    {
        routeLink: 'plan',
        icon: 'bi bi-cash-coin',
        label: 'Plan Formation',
        items: [
         /*    {
                routeLink: 'plan/plan',
                label: 'Plan'
            }, */
          {
            routeLink: 'plan/frais',
            label: 'Frais Mission'
          },
            {
                routeLink: 'plan/budget',
                label: 'Budget',
               items: [
            {
                routeLink: 'plan/budget/direction',
                label: 'Direction'
             },
             {
                 routeLink: 'plan/budget/departement',
                 label: 'Departement'
             }
          ]
            }
        ]
    },
  {
    routeLink: 'formation',
    icon: 'bi bi-clipboard',
    label: 'Formation',
    items: [
      {
        routeLink: 'formation/formulaire',
        label: 'Formulaire'
      },
      {
        routeLink: 'formation/formations',
        label: 'Formations'
      }
    ]
  },
  {
    routeLink: 'planning',
    icon: 'bi bi-calendar4-range',
    label: 'Planning',
    items: [
      {
        routeLink: 'planning/planning',
        label: 'Calendrier'
      },
      {
        routeLink: 'planning/salle',
        label: 'Salle'
      }
    ]
  },


  {
        routeLink: 'stage',
        icon: 'bi bi-file-earmark-person',
        label: 'Stage'
    },

  {
    routeLink: 'statistique',
    icon: 'bi bi-bar-chart',
    label: 'Statistique'
  },
    {
        routeLink: 'user',
        icon: 'bi bi-person-bounding-box',
        label: 'Utilisateur',
    },
];
