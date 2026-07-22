export interface Realization {
  id: string;
  title: string;
  loc: string;
  province: string;
  domain: string;
  date: string;
  tag: string;
  description: string;
  imageUrl: string;
  beneficiaries: string;
  status: 'Réalisé' | 'En cours';
  longDescription: string;
  keyAchievements: string[];
}

export const BASELINE_REALIZATIONS: Realization[] = [
  {
    id: 'base-1',
    title: 'Projet MAKAYABO — Autonomisation',
    loc: 'Goma',
    province: 'Nord-Kivu',
    domain: 'Autonomisation',
    date: 'Mars 2024',
    tag: 'Insertion',
    description: "Formation en entrepreneuriat et dotation en kits de micro-crédits d'amorçage pour relancer l'économie des familles.",
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
    beneficiaries: '150 mères de famille',
    status: 'Réalisé',
    longDescription: "Ce projet de référence vise à sortir les mères célibataires, veuves de guerre et femmes déplacées de l'extrême pauvreté dans les faubourgs de Goma. En marge d'un apprentissage de 3 semaines en gestion commerciale élémentaire, chacune a reçu des marchandises de première nécessité et un capital d'amorçage.",
    keyAchievements: [
      '150 foyers devenus financièrement autonomes',
      "92% de pérennité des commerces après 6 mois",
      "Création d'une dynamique solidaire d'épargne locale (AVEC)"
    ]
  },
  {
    id: 'base-2',
    title: 'Pépinière communautaire et reforestation',
    loc: 'Nyamukubi',
    province: 'Sud-Kivu',
    domain: 'Agro-pastoral',
    date: 'Décembre 2023',
    tag: 'Environnement',
    description: "Production de 10 000 jeunes plants d'espèces forestières et fruitières pour sécuriser les sols glissants de Kalehe.",
    imageUrl: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=600',
    beneficiaries: '350 ménages sinistrés',
    status: 'Réalisé',
    longDescription: "Consécutivement aux tragiques inondations et glissements de terrain ayant endommagé le territoire de Kalehe, notre comité local a mobilisé des bénévoles pour reboiser d'urgence les montagnes environnantes tout en intégrant des espèces fruitières génératrices de revenus alimentaires.",
    keyAchievements: [
      '10 000 jeunes pousses forestières et fruitières plantées',
      '40 agriculteurs leaders formés aux pépinières',
      'Erosion des pentes montagneuses fortement ralentie'
    ]
  },
  {
    id: 'base-3',
    title: 'Jardins potagers et sécurité nutritionnelle',
    loc: 'Kabare',
    province: 'Sud-Kivu',
    domain: 'Agro-pastoral',
    date: 'Février 2024',
    tag: 'Maraîchage',
    description: "Transfert de compétences maraîchères écologiques et dotation en semences sélectionnées pour lutter contre la malnutrition.",
    imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=600',
    beneficiaries: '220 femmes paysannes',
    status: 'En cours',
    longDescription: "Pour contrecarrer le fléau de la malnutrition infantile chronique, SOPFFI a initié des jardins écoles communautaires d'apprentissage. Les paysannes apprennent des techniques maraîchères saines (amarante, épinards, maïs enrichi) permettant d'assurer la sécurité nutritionnelle des ménages.",
    keyAchievements: [
      '8 coopératives féminines structurées et accompagnées',
      "Fourniture de semences et d'outils aratoires modernes",
      "Diminution sensible des indices de malnutrition infantile locale"
    ]
  },
  {
    id: 'base-4',
    title: 'Dotation de kits couture professionnels',
    loc: 'Uvira',
    province: 'Sud-Kivu',
    domain: 'Autonomisation',
    date: 'Janvier 2024',
    tag: 'Artisanat',
    description: "Insertion économique durable de jeunes filles marginalisées par l'octroi de machines à coudre de haute fiabilité.",
    imageUrl: 'https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&q=80&w=600',
    beneficiaries: '45 filles-mères désœuvrées',
    status: 'Réalisé',
    longDescription: "Il s'agit de l'étape d'insertion concrète couronnant une formation professionnelle qualifiante de 6 mois au sein du centre d'apprentissage SOPFFI. Les lauréates s'installent en collectifs ou ateliers autonomes pour générer de manière pérenne leurs propres revenus.",
    keyAchievements: [
      '45 machines manuelles de haute robustesse remises',
      "Création et encadrement de 5 ateliers de tailleurs populaires",
      "Suivi technique et financier de proximité assuré"
    ]
  },
  {
    id: 'base-5',
    title: 'Soutien aux orphelins victimes de conflits',
    loc: 'Goma',
    province: 'Nord-Kivu',
    domain: 'Education',
    date: 'Septembre 2023',
    tag: 'Scolarisation',
    description: 'Distribution de mallettes scolaires garnies et paiement de frais de scolarité pour prémunir du décrochage.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600',
    beneficiaries: '500 enfants orphelins',
    status: 'Réalisé',
    longDescription: "À la rentrée des classes, SOPFFI s'investit pour que l'enfance vulnérable ne soit pas pénalisée par la guerre. Notre action cible en priorité les orphelins résidant dans et autour des camps humanitaires, pérennisant ainsi l'instruction obligatoire.",
    keyAchievements: [
      "500 écoliers équipés d'uniformes et de fournitures neuves",
      'Frais de scolarisation pris en charge directement',
      'Distribution bi-hebdomadaire de collations fortifiées'
    ]
  },
  {
    id: 'base-6',
    title: 'Écoute psychologique et plaidoyer VBG',
    loc: 'Minova',
    province: 'Sud-Kivu',
    domain: 'Droits',
    date: 'Novembre 2023',
    tag: 'Protection',
    description: 'Soutien d\'auxiliaires psychosociales et hébergement juridique pour la restauration des droits civiques des victimes.',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
    beneficiaries: '130 survivantes de VBG',
    status: 'Réalisé',
    longDescription: "La cellule de défense juridique de SOPFFI s'établit à Minova pour accompagner la prise en charge clinique et psychologique des victimes de violences de guerre, complétée par un accompagnement fort près des instances de police et tribunaux.",
    keyAchievements: [
      '130 femmes prises en charge au plan psychologique et juridique',
      "Sensibilisation d'un collège de 12 chefs coutumiers locaux",
      "Mise en service d'une ligne téléphonique d'écoute permanente"
    ]
  },
  {
    id: 'base-7',
    title: 'Réhabilitation des enfants des carrières de mine',
    loc: 'Bunia',
    province: 'Ituri',
    domain: 'Education',
    date: 'Octobre 2023',
    tag: "Droits de l'Enfant",
    description: 'Extraction pacifique des enfants des sites miniers artisanaux et réintégration en cursus scolaire accéléré.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
    beneficiaries: '80 jeunes réintégrés',
    status: 'En cours',
    longDescription: "Ce projet coordonné par SOPFFI Ituri combat l'exploitation économique précoce des enfants au cœur des chantiers aurifères artisanaux d'Ituri. Nous offrons des sessions intensives d'alphabétisation suivies d'un appui logistique et civique constant.",
    keyAchievements: [
      '80 jeunes définitivement soustraits de la poussière des galeries de mine',
      '2 classes spéciales pilotes d\'intégration active opérationnelles',
      "Appui d'une ration alimentaire mensuelle de compensation aux parents"
    ]
  },
  {
    id: 'base-8',
    title: 'Cliniques médicales mobiles de secours',
    loc: 'Camps de Bunia',
    province: 'Ituri',
    domain: 'Sante',
    date: 'Janvier 2024',
    tag: 'Santé Publique',
    description: "Prestations gratuites de soins pédiatriques et d'obstétrique pour soulager les mères dans l'isolement humanitaire.",
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
    beneficiaries: '1 200 déplacés internes',
    status: 'Réalisé',
    longDescription: "Face à la pénurie cruelle de soignants et de molécules thérapeutiques de base au sein des camps spontanés, l'antenne mobile d'Ituri organise des permanences médicales avec des médecins volontaires de l'ONG.",
    keyAchievements: [
      '1 200 malades auscultés et traités gracieusement',
      'Matériel de détection rapide de la malaria pour 600 enfants',
      "Trousses de césarienne et soins prénataux pour 150 accoucheuses"
    ]
  },
  {
    id: 'base-9',
    title: "Accès durable à l'eau potable Maluku",
    loc: 'Maluku',
    province: 'Kinshasa',
    domain: 'Sante',
    date: 'Février 2024',
    tag: 'Eau & Assainissement',
    description: "Installation d'un forage avec pompage solaire et réseaux de distribution pour enrayer le choléra.",
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600',
    beneficiaries: '400 familles riveraines',
    status: 'Réalisé',
    longDescription: "Pour anéantir les risques d'infection par l'eau insalubre du fleuve, SOPFFI a construit une unité moderne de potabilisation alimentée à l'énergie photovoltaïque desservant le dispensaire rural de la périphérie Kinoise.",
    keyAchievements: [
      "Accès journalier et sécurisé de 10 000 Litres d'eau micro-filtrée",
      'Formation de 5 techniciens locaux de salubrité',
      'Chute drastique de 85% des parasitoses intestinales pédiatriques'
    ]
  },
  {
    id: 'base-10',
    title: 'Plaidoyer successoral foncier des veuves',
    loc: 'Limete',
    province: 'Kinshasa',
    domain: 'Droits',
    date: 'Décembre 2023',
    tag: 'Législation',
    description: "Formation juridique populaire et conciliation d'arbitrages coutumiers pour préserver le droit d'héritage foncier.",
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600',
    beneficiaries: '110 veuves assistées',
    status: 'Réalisé',
    longDescription: "L'axe principal de plaidoyer institutionnel à Kinshasa tend à faire converger le droit écrit reconnu par la République avec la coutume provinciale ancestrale spoliant fréquemment les femmes à la mort de leur conjoint.",
    keyAchievements: [
      '110 arbitres en matière foncière réglés formellement par compromis pacifique',
      "Adhésion actée de 12 notables et maires d'arrondissement urbains",
      "Impression de 500 lexiques vulgarisés en lingala sur le code familial"
    ]
  },
  {
    id: 'base-11',
    title: 'Coopérative de farine de manioc enrichie',
    loc: 'Périphérie de Kindu',
    province: 'Maniema',
    domain: 'Autonomisation',
    date: 'Mai 2024',
    tag: 'Transformation',
    description: "Installation de moulins entraînés et conditionnement sous emballages hygiéniques pour accroître la plus-value.",
    imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=600',
    beneficiaries: '60 maraîchères paysannes',
    status: 'En cours',
    longDescription: "Ce volet à Kindu investit dans la valorisation post-récolte. Pour surmonter les surproductions éphémères de manioc brut périssable, les coopératives bénéficient d'équipements de séchage et de mouture de haute valeur ajoutée.",
    keyAchievements: [
      'Moulins à haut débit remis officiellement sous gestion coopérative',
      'Lancement de la filière "Farine de Goma enrichie" homologuée localement',
      'Saut du revenu réel des ménages agricoles de 35%'
    ]
  },
  {
    id: 'base-12',
    title: 'Amélioration maraîchère rurale',
    loc: 'Kindu',
    province: 'Maniema',
    domain: 'Agro-pastoral',
    date: 'Avril 2024',
    tag: 'Agro-écologie',
    description: "Initiation à l'engrais de compost autonome et mise en place de banques collectives de semences vivrières.",
    imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600',
    beneficiaries: '95 maraîchers actifs',
    status: 'En cours',
    longDescription: "Favoriser l'agriculture durable pour endiguer la dépendance importatrice du Maniema. Les techniciens agronomes de la SOPFFI vulgarisent les procédés agro-écologiques simplifiés auprès de groupements sans ressources.",
    keyAchievements: [
      '1 station d\'expérimentation technique opérationnelle',
      '95 maraîchers formés à la valorisation des engrais organiques',
      'Hausse moyenne des rendements constatés de 50%'
    ]
  }
];
