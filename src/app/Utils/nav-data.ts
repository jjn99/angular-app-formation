import { INavbarData } from "./helper";

export const navbarStageData: INavbarData[] =[
   {
          routeLink: '',
          icon: 'bi bi-house-door',
          label: 'Accueil'
      },
        {
              routeLink: '',
              icon: 'bi bi-file-earmark-person',
              label: 'Stage'
          },

        {
          routeLink: '',
          icon: 'bi bi-bar-chart',
          label: 'Statistique'
        }
]

export const navbarFormationData: INavbarData[] =[
   {
          routeLink: '',
          icon: 'bi bi-house-door',
          label: 'Accueil'
   },
   {
          routeLink: '',
          icon:'',
          label: 'Frais Mission'
   },
   {
          routeLink: '',
          icon: 'bi bi-cash-coin',
          label: 'Plan Formation',
          items: [
              {
                  routeLink: '',
                  label: 'Besoins Formation'
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
       routeLink: '',
       icon: 'bi bi-clipboard',
       label: 'Formation',
       items: [
                {
                  routeLink: '',
                  label: 'Burkina Faso'
                },
                {
                  routeLink: '',
                  label: 'Exterieur'
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
                 routeLink: '',
                 icon: 'bi bi-bar-chart',
                 label: 'Statistique'
            }
]

  export const navbarManagerData: INavbarData[] = [
      {
            routeLink: '',
            icon: 'bi bi-house-door',
            label: 'Accueil'
      },
      {
            routeLink: '',
            icon: 'bi bi-people',
            label: 'Carriere'
      },
      {
            routeLink: '',
            icon: 'bi bi-house-door',
            label: 'Besoins Formation'
      },
      {
            routeLink: '',
            icon: 'bi bi-house-door',
            label: 'Stages'
      },
      {
            routeLink: '',
            icon: 'bi bi-house-door',
            label: 'Help'
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
      }
  ]

export const navbarAdminData: INavbarData[] = [
    {
        routeLink: '',
        icon: 'bi bi-house-door',
        label: 'Accueil'
    },
    {
        routeLink: '',
        icon: 'bi bi-file-earmark-person',
        label: 'Assistant'
    },
    {
        routeLink: '',
        icon: 'bi bi-bar-chart',
        label: 'Statistique'
    },
    {
        routeLink: '',
        icon: 'bi bi-person-bounding-box',
        label: 'Utilisateur',
    },
];
